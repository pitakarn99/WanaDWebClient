import DocEditorVMBase from "Lib/Fs.SmartClient.Client/DocEditorVMBase";

import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import { Registration } from "aurelia";

export default class DocSearchVMBase<
  T extends DocEditorVMBase
> extends DocEditorVMBase {
  ItemType: new () => T;
  PageSize: number;
  PageIndex: number;
  EnablePaging: boolean;
  SearchResultCollectionView: T[];
  SelectedItems: T[];
  currentItem: T;
    childContainer
  constructor(type: { new (): T }) {
    super();
    this.ItemType = type;
    this.SelectedItems = [];
    this.SearchResultCollectionView = [];
     // this.container.register(Registration.transient(type, type));//try set auto not regis
      this.childContainer = this.container.createChild();
      this.childContainer.register(Registration.transient(type, type));
  }

  get CurrentItem() {
    return this.currentItem;
  }

  OnCurrentChangingAsync(sender, e) {
    const oldSelectedEditorVM = this.currentItem;
    if (oldSelectedEditorVM != null) oldSelectedEditorVM.IsSelectedItem = false;
  }

  async OnCurrentChangedAsync(sender, e) {}

  async SaveOriginalSourceAsync(originalSource: any[]) {
    for (
      let index = 0;
      index < this.SearchResultCollectionView.length;
      index++
    ) {
      const item = this.SearchResultCollectionView[index];
      const o = {};
      await item.SaveOriginalSourceAsync(o);

      originalSource.push(o);
    }
  }

  async LoadOriginalSourceAsync(originalSource: any, isAdding: boolean) {
    if (isAdding == null) isAdding = false;

    this.SearchResultCollectionView = [];
    //this.ClearChildNode();

    if (originalSource == null) return;

    const list = [];

    for (let index = 0; index < originalSource.length; index++) {
        const editorVM = this.childContainer.get(this.ItemType);
      const item = originalSource[index];

      if (isAdding) this.InitializeAddingItem(editorVM);
      else this.InitializeLoadingItem(editorVM);

      await editorVM.SetOriginalSourceAsync(item, isAdding);

      list.push(editorVM);
      this.AddChildNode(editorVM);
    }

    this.SearchResultCollectionView = list;
  }

  BeginEdit() {
    this.IsEditing = true;
    for (
        let index = 0;
      index < this.SearchResultCollectionView.length;
      index++
    ) {
      const item = this.SearchResultCollectionView[index];
      item.BeginEdit();
    }
  }

  InitializeAddingItem(editorVM: T) {
    editorVM.IsAdding = true;
  }

  InitializeLoadingItem(editorVM: T) {
    editorVM.IsAdding = false;
  }

  async CreateNewItemAsync(originalSource: any) {
      const item = this.childContainer.get(this.ItemType);
    this.AddItem(item);
    await this.SetCurrentItemAsync(item);
    this.InitializeAddingItem(item);
    if (originalSource != null && originalSource != this)
      await item.LoadOriginalSourceAsync(originalSource, true);
    this.AddChildNode(item);

    item.BeginEdit();
    item.IsItemEditing = true;

    return item;
  }

  CreateNewItems(originalSource: any) {
      for (let index = 0; index < originalSource.length; index++) {
        const editorVM = this.childContainer.get(this.ItemType) as any;
      const item = originalSource[index];

      this.InitializeLoadingItem(editorVM);
      editorVM.LoadOriginalSource(item);

      this.AddChildNode(editorVM);
      this.SearchResultCollectionView.unshift(editorVM);
    }
  }

  BeginEditCommand(vm: T) {
    vm.BeginEdit();
    vm.IsItemEditing = true;
  }

  async EndEditCommandAsync(vm: T, cancel: boolean) {
    if (cancel == false) {
      vm.ValidationController.validate({ object: vm }).then(async (result) => {
        if (result.valid) {
          await vm.EndItemEditAsync();
          vm.IsAdding = false;
        }
      });
    } else {
      vm.IsItemEditing = false;
      if (vm.HasOriginalSource)
        await vm.LoadOriginalSourceAsync(vm.OriginalSource, false);

      if (!vm.HasOriginalSource) {
        await this.RemoveItemAsync(vm);
      }
    }
  }

  async RemoveCommandAsync(editorVM: T) {
    const searchVM = this;
    const self = this;

    FsUtility.AlertModal(
      "Are you sure to delete ?",
      3,
      3,
      async function (result) {
        if (result == true) {
          await searchVM.RemoveItemAsync(editorVM);
          searchVM.RemoveChildNode(editorVM);
        }
      }
    );
  }

  async RemoveItemAsync(item: T) {
    await this.SetCurrentItemAsync(null);
    for (let i = 0; i < this.SearchResultCollectionView.length; i++) {
      if (this.SearchResultCollectionView[i] === item) {
        this.SearchResultCollectionView.splice(i, 1);
      }
    }
  }

  AddItem(item: T) {
    this.SearchResultCollectionView.push(item);
  }

  async SetCurrentItemAsync(value: T) {
    await this.OnCurrentChangingAsync(this, null);

    const newSelectedEditorVM = value;
    if (newSelectedEditorVM != null) newSelectedEditorVM.IsSelectedItem = true;
    this.currentItem = newSelectedEditorVM;

    await this.OnCurrentChangedAsync(this, null);
  }

  SelectChanged(editorVM: T, isChecked: boolean) {
    if (isChecked) {
      this.SelectedItems.push(editorVM);
    } else {
      for (let i = 0; i < this.SelectedItems.length; i++) {
        if (this.SelectedItems[i] === editorVM) {
          this.SelectedItems.splice(i, 1);
        }
      }
    }
  }
  Validate() {
    super.ValidateData();

      let valid = super.Validate();
      for (let i = 0; i < this.SearchResultCollectionView.length; i++) {
      const editorVM = this.SearchResultCollectionView[i];
      editorVM.ValidateData();
      valid = valid && editorVM.Validate();
    }

    return valid;
  }
}
