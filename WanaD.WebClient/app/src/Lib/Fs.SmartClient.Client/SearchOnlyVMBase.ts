import EditableContainerBase from "Lib/Fs.SmartClient.Client/EditableContainerBase";

import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import SortBy from "Lib/Fs.Core.Data/SortBy";
import PagingCriteria from "Lib/Fs.Core.Data/PagingCriteria";
import SortingCriteria from "Lib/Fs.Core.Data/SortingCriteria";
import CommonSearchVMBase from "Lib/Fs.SmartClient.Client/CommonSearchVMBase";
import { IObserverLocator, resolve } from "aurelia";

export default class SearchOnlyVMBase<T> extends CommonSearchVMBase {
  SearchResultCollectionView: T[] = [];
  SelectedItems: T[] = [];
  currentItem: T;
  ItemType: new () => T;
  IsSelectAllChecked: boolean;
  observerLocator = resolve(IObserverLocator) as IObserverLocator;
  get CurrentItem() {
    return this.currentItem;
  }

  constructor(type: { new (): T }) {
    super();
    this.ItemType = type;
    this.SortingCriteria = new Array<SortBy>();
    this.PagingCriteria = new PagingCriteria();
  }

  attached() {
    var self = this;
    self.observerLocator.getObserver(this, "PageSize").subscribe({
      handleChange: (newValue, oldValue) => {
        if (newValue == oldValue) return;

        if (self.EnablePaging && self.PageCount > 0) {
          self.SearchAsync();
        }
      },
    });
  }

  get PageCount() {
    if (this.PageSize == 0 || this.ItemCount == 0 || this.PageSize == null)
      return 0;
    var roundingValue = this.ItemCount / this.PageSize;
    var roundedValue = Math.round(roundingValue);
    return roundingValue > roundedValue ? roundedValue + 1 : roundedValue;
  }

  GetItemIndex(i: number) {
    return this.PageIndex * this.PageSize + i;
  }

  InitialPageIndexList() {
    var PageIndexList = [];
    for (var index = 1; index <= this.PageCount; index = index + 1)
      PageIndexList.push(index);

    this.GridPageIndexList = PageIndexList;
  }

  async OnCurrentChangedAsync(sender, e) {
    this.ClearChildNode();
    if (this.CurrentItem == null) return;

    this.AddChildNode(this.CurrentItem);
  }

  async OnCurrentChangingAsync(sender, e) {
    return true;
  }

  async SearchAsync(isChangePage: boolean = false) {
    var self = this;

    if (this.HasEditingChilds) return;

    this.SelectedItems = [];
    await this.SetCurrentItemAsync(null);
    this.IsSelectAllChecked = false;

    if (this.EnablePaging && this.PageSize > 0) {
      await this.CountItemsAsync(async function (count) {
        self.ItemCount = count;

        if (self.EnablePaging && !isChangePage) {
          self.PageIndex = 0;
        }

        self.PagingCriteria = {
          PageIndex: self.PageIndex,
          PageSize: self.PageSize,
        };

        await self.SearchStep2Async(isChangePage);
      });
    } else {
      await self.SearchStep2Async(isChangePage);
    }
  }

  async SearchStep2Async(isChangePage: boolean = false) {
    var self = this;

    if (this.SortingCriteria == null || this.SortingCriteria.length == 0)
      this.PrepareDefaultSortingCriteria(this.SortingCriteria);

    await this.SearchItemsAsync(
      async function (data) {
        await self.PrepareListViewCollectionAsync(data);
        self.InitialPageIndexList();
        self.GeneratePageNumberList();
      },
      this.SortingCriteria,
      this.PagingCriteria
    );
  }

  PrepareDefaultSortingCriteria(sortingCriteria: SortingCriteria) {}

  async CountItemsAsync(searchCallback: (result: number) => void) {
    searchCallback(0);
  }

  async SearchItemsAsync(
    searchCallback: (result: any[]) => void,
    sortingCriteria: SortingCriteria,
    pagingCriteria: PagingCriteria
  ) {}

  async RemoveItemsAsync(items: T[]) {
    throw "This function has not yet been implemented.";
  }

  async AddItemsAsync(items: T[]) {
    throw "This function has not yet been implemented.";
  }

  async AddItemAsync(item: T) {}

  async RemoveItemAsync(item: T) {}

  async PrepareListViewCollectionAsync(list: T[]) {
    this.SearchResultCollectionView = [];

    if (list == null) return;

    var dataList = [];
    for (var index = 0; index < list.length; index++) {
      var convertedData = list[index];

      dataList.push(convertedData);
    }
    this.SearchResultCollectionView = dataList;
  }

  async SetCurrentItemAsync(value: T) {
    if (await !this.OnCurrentChangingAsync(this, null)) return;
    this.currentItem = value;
    await this.OnCurrentChangedAsync(this, null);
  }

  async SortingChangedAsync(column: string) {
    if (this.SortingCriteria.length > 0) {
      var sortingColumn = this.SortingCriteria.find((t) => t.Name == column);
      if (sortingColumn == null) {
        this.SortingCriteria.pop();
        var sortBy = new SortBy();
        sortBy.Direction = 0;
        sortBy.Name = column;
        this.SortingCriteria.push(sortBy);
      } else {
        if (sortingColumn.Direction == 0) {
          sortingColumn.Direction = 1;
          sortingColumn.Name = column;
        } else {
          this.SortingCriteria.pop();
        }
      }
    } else {
      var sortBy = new SortBy();
      sortBy.Direction = 0;
      sortBy.Name = column;
      this.SortingCriteria.push(sortBy);
    }
    await this.SearchAsync();
  }

  GetSortingStatus(column: string, var1: any) {
    var sortingColumn = this.SortingCriteria.find((t) => t.Name == column);
    if (sortingColumn == null) {
      return -1;
    } else {
      return sortingColumn.Direction;
    }
  }

  SelectChanged(editorVM: T, isChecked: boolean) {
    if (isChecked) {
      this.SelectedItems.push(editorVM);
      if (
        this.SearchResultCollectionView.length ==
        this.SelectedItems.filter(function (t) {
          return t["IsChecked"] == true;
        }).length
      ) {
        this.IsSelectAllChecked = true;
      }
    } else {
      for (var i = 0; i < this.SelectedItems.length; i++) {
        if (this.SelectedItems[i] === editorVM) {
          this.SelectedItems.splice(i, 1);
        }
      }
      this.IsSelectAllChecked = false;
    }
  }

  public SelectAll(isChecked: boolean) {
    if (isChecked) {
      for (var i = 0; i < this.SearchResultCollectionView.length; i++) {
        var item = this.SearchResultCollectionView[i];
        this.SelectedItems.push(item);
        item["IsChecked"] = true;
      }
    } else {
      this.SelectedItems = [];
      for (var i = 0; i < this.SearchResultCollectionView.length; i++) {
        var item = this.SearchResultCollectionView[i];
        item["IsChecked"] = false;
      }
    }
  }
}
