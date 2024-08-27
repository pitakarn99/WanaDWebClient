import SearchOnlyVMBase from "Lib/Fs.SmartClient.Client/SearchOnlyVMBase";
import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import FsUtility from "./FsUtility";

export default class SearchVMBase<
  T extends EditorVMBase
> extends SearchOnlyVMBase<T> {
  IsSearchAfterSave: boolean;
  IsClearSelectionAfterSave: boolean;

  EditorVMType: new () => T;

  constructor(type: { new (): T }) {
    super(type);
    this.EditorVMType = type;
  }

  OnSaveSuccess(editorVM: T) {}

  async UpdateCommandAsync(editorVM: T) {
    var self = this;
    editorVM.ValidationController.validate({ object: editorVM }).then(
      async (result) => {
        if (result.valid) {
          await editorVM.SaveAsync(async function () {
            await editorVM.EndEditAsync();
            self.OnSaveSuccess(editorVM);

            if (self.IsSearchAfterSave == true) await self.SearchAsync();
            else if (self.IsClearSelectionAfterSave == true) {
              await self.SetCurrentItemAsync(null);
              self.SelectedItems = [];
            }
          }, FsUtility.CommonErrorHandler);
        }
      }
    );
  }

  async RemoveCommandAsync(editorVM: T) {
    var searchVM = this;
    if (this.HasEditingChilds) return;
    await searchVM.RemoveItemAsync(editorVM);
  }

  async EditCommandAsync(editorVM: T) {
    var self = this;
    setTimeout(async function () {
      if (self.HasEditingChilds) return;

      await self.SetCurrentItemAsync(editorVM);
      editorVM.BeginEdit();
    }, 1);
  }

  async CancelCommandAsync(editorVM: T) {
    var searchVM = this;

    if (editorVM == null) return;

    if (!editorVM.HasOriginalSource) {
      await this.SetCurrentItemAsync(null);
      this.SelectedItems = [];
      await searchVM.RemoveItemAsync(editorVM);
    } else await editorVM.CancelEditAsync();
  }

  async CreateNewItemAsync() {
    if (this.HasEditingChilds) return;

    var editorVM = new this.EditorVMType();

    await this.AddItemAsync(editorVM);
    await this.SetCurrentItemAsync(editorVM);

    editorVM.BeginEdit();

    return editorVM;
  }

  async OnCurrentChangedAsync(sender, e) {
    this.ClearChildNode();
    if (this.CurrentItem == null) return;

    this.AddChildNode(this.CurrentItem);
    if (this.CurrentItem != null) await this.CurrentItem.ActivateAsync();
  }

  OnCurrentChanging(sender, e) {
    if (this.HasEditingChilds) return false;

    return true;
  }

  async RemoveItemsAsync(items: T[]) {
    throw "This function has not yet been implemented.";
  }

  async AddItemsAsync(items: T[]) {
    throw "This function has not yet been implemented.";
  }

  async AddItemAsync(item: T) {
    this.InitializeAddingItem(item);

    this.SearchResultCollectionView.push(item);
  }

  async RemoveItemAsync(item: T) {
    var self = this;
    item.SetIsEditing(false);
    if (item.HasOriginalSource) {
      await item.RemoveAsync(this, async function () {
        await self.SetCurrentItemAsync(null);
        for (var i = 0; i < self.SearchResultCollectionView.length; i++) {
          if (self.SearchResultCollectionView[i] === item) {
            self.SearchResultCollectionView.splice(i, 1);
          }
        }
        await self.SearchAsync();
      });
    } else {
      await self.SetCurrentItemAsync(null);
      for (var i = 0; i < self.SearchResultCollectionView.length; i++) {
        if (self.SearchResultCollectionView[i] === item) {
          self.SearchResultCollectionView.splice(i, 1);
        }
      }
      await self.SearchAsync();
    }
  }

  GetItemIndex = function (i) {
    return this.PageIndex * this.PageSize + i;
  };

  async PrepareListViewCollectionAsync(list: any[]) {
    // array list of SearchResult
    this.SearchResultCollectionView = [];

    var editorVMList = [];
    for (var index = 0; index < list.length; index++) {
      // index for example [0],[1],[2],...,[n]
      var editorVM = new this.EditorVMType();
      this.InitializeLoadingItem(editorVM);
      await editorVM.SetOriginalSourceAsync(list[index]);
      editorVM.index = this.GetItemIndex(index + 1);
      editorVMList.push(editorVM); // push each record into grid.
    }
    this.SearchResultCollectionView = editorVMList;
  }

  InitializeAddingItem(editorVM: T) {}

  InitializeLoadingItem(editorVM: T) {}
}
