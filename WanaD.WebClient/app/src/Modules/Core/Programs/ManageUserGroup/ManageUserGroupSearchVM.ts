/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-async-promise-executor */
import SearchVMBase from "Lib/Fs.SmartClient.Client/SearchVMBase";
import PagingCriteria from "Lib/Fs.Core.Data/PagingCriteria";
import SortingCriteria from "Lib/Fs.Core.Data/SortingCriteria";
import SortBy from "Lib/Fs.Core.Data/SortBy";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import ManageUserGroupEditorVM from "./ManageUserGroupEditorVM";
import UserData01 from "../../../Core/Scripts/AppServiceContract/UserData01";
import ManageUserGroupMemberSearchParameter from "../../Scripts/AppServiceContract/ManageUserGroupMemberSearchParameter";
import UserCriteria01 from "../../../Core/Scripts/UserCriteria01";
import ManageUserGroupAppService from "../../Scripts/AppServiceContract/ManageUserGroupAppService";
import SearchVMBase2 from "Lib/Fs.SmartClient.Client/SearchVMBase2";
import { IRouter } from "@aurelia/router";
import { newInstanceForScope } from "@aurelia/kernel";
import { IValidationController } from "@aurelia/validation-html";
import template from './ManageUserGroupSearchVM.html';
import { customElement, resolve } from 'aurelia';

@customElement({
    name: 'ManageUserGroupSearchVM',
    template
})
export default class ManageUserGroupSearchVM extends SearchVMBase2<ManageUserGroupEditorVM, UserCriteria01>{
  Name: string;
  IsActive: boolean;
  IsActiveList: [];
  DefaultGroupCode: string;
  ItemsProvider: any;
  template: any;
    router: IRouter = resolve(IRouter);

    constructor() {
    super(ManageUserGroupEditorVM);
    var self = this;
    //var list = FsUtility.GetEnumTranslateList("IsActive", "EBill");
    //list.unshift({ Value: null, Name: "" });

    this.IsSearchAfterSave = true;
    this.IsClearSelectionAfterSave = true;

    new Promise(async () => {
      await this.SearchAsync();
    });
  }

  async SearchItemsAsync(searchCallback: (result: UserData01[]) => void, searchCriteria: UserCriteria01, sortingCriteria: SortingCriteria, pagingCriteria: PagingCriteria) {
    var self = this;

      var service = this.container.get(ManageUserGroupAppService) as ManageUserGroupAppService;

    var criteria = new ManageUserGroupMemberSearchParameter();
    criteria.Criteria = searchCriteria;
    criteria.SortingCriteria = sortingCriteria;
    criteria.PagingCriteria = pagingCriteria;

    try {
      var result = await service.FindAsync(criteria);
        searchCallback(result);
    } catch (error) {
      FsUtility.CommonErrorHandler(error);
  }
  }

  PrepareDefaultSortingCriteria(sortingCriteria: SortingCriteria) {
    var sortBy = new SortBy();
    sortBy.Direction = 0;
    sortBy.Name = "Name";
    sortingCriteria.push(sortBy);
  }

  async CountItemsAsync(countCallback: (result: number) => void) {
    var self = this;
    var criteria = self.CreateCriteria();

      var service = this.container.get(ManageUserGroupAppService) as ManageUserGroupAppService;

      try {
        var result = await service.CountAsync(criteria);
        countCallback(result);
      } catch (error) {
        FsUtility.CommonErrorHandler(error);
    }
  }

  SearchCriteria: UserCriteria01;

  CheckCriteriaEquals(searchCriteria: UserCriteria01) {
    if (this.SearchCriteria == null) return false;
    return JSON.stringify(this.SearchCriteria) == JSON.stringify(searchCriteria);
  }

  CreateCriteria(): UserCriteria01 {
    var cri = new UserCriteria01();
    cri.Name = $.trim(this.Name);
    //cri.isActive = this.IsActive == null || this.IsActive == "" ?
    //    null : this.IsActive == EBillEnum.IsActive.Active ? true : false;
    cri.IsGroup = true;
    return cri;
  }

  async RemoveCommandAsync(editorVM: ManageUserGroupEditorVM) {
    super.RemoveCommandAsync(editorVM);
  }

  Clear(): void {
    this.Name = null;
    this.IsActive = null;
  }

  AddCommand() {
    this.router.load("Modules/Core/UserGroupDetailPage/");
  }

    InitializeLoadingItem(editorVM: ManageUserGroupEditorVM) {
        editorVM.router = this.router;
    }
}
