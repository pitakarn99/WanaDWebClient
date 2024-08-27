import EditableContainerBase from "Lib/Fs.SmartClient.Client/EditableContainerBase";
import SortBy from "Lib/Fs.Core.Data/SortBy";
import PagingCriteria from "Lib/Fs.Core.Data/PagingCriteria";
import SortingCriteria from "Lib/Fs.Core.Data/SortingCriteria";

export default class CommonSearchVMBase extends EditableContainerBase {
  SortingCriteria: SortingCriteria;
  PagingCriteria: PagingCriteria;
  ItemCount: number = 0;
  PageIndex: number = 0;
  PageSize: number = 5;
  PageNumberSize: number = 5;
  EnablePaging: boolean = true;
  GridPageIndexList: string[];
  PageNumberIndex: number;
  PageNumberList: any[] = [];

  get PageCount() {
    if (this.PageSize == 0 || this.ItemCount == 0 || this.PageSize == null)
      return 0;
    var roundingValue = this.ItemCount / this.PageSize;
    var roundedValue = Math.round(roundingValue);
    return roundingValue > roundedValue ? roundedValue + 1 : roundedValue;
  }

  get MaxPageNumbers() {
    if (
      this.PageCount == 0 ||
      this.PageNumberSize == 0 ||
      this.PageNumberSize == null
    )
      return 0;
    var roundingValue = this.PageCount / this.PageNumberSize;
    var roundedValue = Math.round(roundingValue);
    return roundingValue > roundedValue ? roundedValue + 1 : roundedValue;
  }

  constructor() {
    super();
    this.SortingCriteria = new SortingCriteria();
  }

  async SearchAsync(isChangePage: boolean = false) {}

  async RemoveItemsAsync(items: any[]) {
    throw "This function has not yet been implemented.";
  }

  async AddItemsAsync(items: any[]) {
    throw "This function has not yet been implemented.";
  }

  async AddItemAsync(item: any) {
    throw "This function has not yet been implemented.";
  }

  async RemoveItemAsync(item: any) {
    throw "This function has not yet been implemented.";
  }

  async PageChangedAsync(currentPage: number) {
    this.PageIndex = currentPage;
    await this.SearchAsync(true);
  }

  GeneratePageNumberList() {
    var pageNumber = Math.floor(this.PageIndex / this.PageNumberSize);

    this.PageNumberList = [];
    this.PageNumberIndex = pageNumber;

    let pageGeneratedCount = this.PageNumberSize;

    if (this.PageNumberIndex + 1 >= this.MaxPageNumbers) {
      if (this.PageCount == 0) {
        pageGeneratedCount = 1;
      } else {
        pageGeneratedCount =
          this.PageCount % this.PageNumberSize == 0
            ? this.PageNumberSize
            : this.PageCount % this.PageNumberSize;
      }
    }

    for (let i = 0; i < pageGeneratedCount; i++) {
      var pageIndex = this.PageNumberIndex * this.PageNumberSize + i;
      this.PageNumberList.push({
        PageIndex: pageIndex,
        DisplayPage: pageIndex + 1,
      });
    }
  }
}
