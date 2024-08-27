import DocSearchVMBase from "Lib/Fs.SmartClient.Client/DocSearchVMBase";
import DocEditorVMBase from "Lib/Fs.SmartClient.Client/DocEditorVMBase";

export default class DocSearchItemProvider<T extends DocEditorVMBase> {
  searchVM: DocSearchVMBase<T>;

  PageSize: number;
  PageIndex: number;
  SearchResultCollectionView: DocEditorVMBase[];

  get CurrentPage() {
    if (this.PageIndex == null) return 1;

    return this.PageIndex + 1;
  }

  set CurrentPage(value: number) {
    this.SelectPageIndex(value - 1);
  }

  get ItemCount() {
    return this.SearchResultCollectionView.length;
  }

  get TotalPages() {
    var pageSize = this.PageSize == null ? 0 : this.PageSize;
    if (pageSize == 0) return 0;

    return Math.ceil(this.ItemCount / pageSize);
  }

  get TotalPageIndex() {
    var lastIndex = this.TotalPages - 1;
    if (lastIndex < 0) lastIndex = 0;

    return lastIndex;
  }

  get FinalSearchResultCollectionView() {
    var list = [];

    var startIndex = this.PageIndex * this.PageSize;
    var endIndex = startIndex + this.PageSize - 1;
    if (endIndex > this.SearchResultCollectionView.length - 1)
      endIndex = this.SearchResultCollectionView.length - 1;

    for (var i = startIndex; i <= endIndex; i++) {
      list.push(this.SearchResultCollectionView[i]);
    }

    return list;
  }

  get PageIndexList() {
    var pageIndexList = [];
    for (var i = 1; i <= this.TotalPages; i++) pageIndexList.push(i);

    return pageIndexList;
  }

  get DisplayFooterSummary() {
    var msg = "";
    var fromItem = 0;
    var toItem = 0;
    var totalItemPerPage = this.PageSize;
    var itemCount = this.ItemCount;

    if (itemCount > 0) {
      fromItem = this.PageIndex * this.PageSize + 1;
      toItem = fromItem + (totalItemPerPage - 1);

      if (toItem > itemCount) toItem = itemCount;
    }
    msg = fromItem + " - " + toItem + " of " + itemCount + " items";

    return msg;
  }

  SelectPageIndex(pageIndex: number) {
    this.PageIndex = pageIndex;
  }
  SelectFirstPage() {
    this.SelectPageIndex(0);
  }

  SelectPreviousPage() {
    if (this.PageIndex == 0) return;

    this.SelectPageIndex(this.PageIndex - 1);
  }
  SelectNextPage() {
    if (this.PageIndex == this.TotalPageIndex) return;

    this.SelectPageIndex(this.PageIndex + 1);
  }
  SelectLastPage() {
    this.SelectPageIndex(this.TotalPageIndex);
  }
}
