/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-var */
/* eslint-disable no-async-promise-executor */
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import moment from 'moment'
import AuditLogSearchCriteria from "../../Scripts/AuditLogSearchCriteria";
import SortBy from "../../../../Lib/Fs.Core.Data/SortBy";
import AuditLogSearchData from "../../Scripts/AppServiceContract/AuditLogSearchData";
import AuditLogSearchAppService from "../../Scripts/AppServiceContract/AuditLogSearchAppService";
import AuditLogSearchParameter from "../../Scripts/AppServiceContract/AuditLogSearchParameter";
import SortingCriteria from "../../../../Lib/Fs.Core.Data/SortingCriteria";
import PagingCriteria from "../../../../Lib/Fs.Core.Data/PagingCriteria";
import SearchOnlyVMBase from "Lib/Fs.SmartClient.Client/SearchOnlyVMBase";
import AuditLogCategoryData01 from "../../Scripts/AppServiceContract/AuditLogCategoryData01";
import UserData01 from "../../Scripts/AppServiceContract/UserData01";
import ManageUserAppService from "../../Scripts/AppServiceContract/ManageUserAppService";
import SearchOnlyVMBase2 from "Lib/Fs.SmartClient.Client/SearchOnlyVMBase2";
import { IValidationController } from "@aurelia/validation-html";
import { newInstanceForScope } from "@aurelia/kernel";
import template from './AuditLogSearchView.html';
import { customElement, resolve } from 'aurelia';

@customElement({
    name: 'AuditLogSearchView',
    template
})
export default class AuditLogSearchVM extends SearchOnlyVMBase2<AuditLogSearchData, AuditLogSearchCriteria>{
  DateFrom: any;
  DateTo: any;
  SelectedUserId: string;
  AuditLogCategoryCode: string;
  AuditLogSearchData: AuditLogSearchData[];
  SelectedUser: UserData01;
  UserList: UserData01[] = [];
  AuditLogCategoryData01: AuditLogCategoryData01[] = [];
  IdSelect2: string = FsUtility.GenerateGuid();
    ValidationController = resolve(
        newInstanceForScope(IValidationController)
    ) as IValidationController;
    constructor() {
    super(AuditLogSearchData);
    this.DefaultDate();

    new Promise(async () => {
      await this.SearchAsync();
      await this.FindAuditLogCategoryDropdownAsync();
    });
  }

  DefaultDate() {
    this.DateFrom = moment().format("DD-MM-YYYY");
    this.DateTo = moment().format("DD-MM-YYYY");
  }

  ConvertDate(DDMMYYYY: Date): Date {
    if (!DDMMYYYY) {
      return null;
    }
    var DDMMYYYY_string = DDMMYYYY.toString().replace("/", "-");
    DDMMYYYY_string = DDMMYYYY_string.toString().replace("/", "-");
    var dateParts = DDMMYYYY_string.split("-");

    // month is 0-based, that's why we need dataParts[1] - 1
    var YYYYMMDD = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);

    var javascriptdate = new Date(YYYYMMDD);
    return javascriptdate;
  }

  SearchCriteria: AuditLogSearchCriteria;

  CheckCriteriaEquals(searchCriteria: AuditLogSearchCriteria) {
    if (this.SearchCriteria == null) return false;
    return JSON.stringify(this.SearchCriteria) == JSON.stringify(searchCriteria);
  }

  async CountItemsAsync(countCallback: (result: number) => void) {
    var self = this;
    var req = self.CreateCriteria();

      var service = this.container.get(AuditLogSearchAppService) as AuditLogSearchAppService;

    try {
      var result = await service.CountAsync(req);
      countCallback(result);
    } catch (error) {
      FsUtility.CommonErrorHandler(error);
    }
  }

  public PrepareDefaultSortingCriteria(sortingCriteria: SortBy[]): void {
    var sortBy = new SortBy();
    sortBy.Direction = 0;
    sortBy.Name = "EventDate";
    sortingCriteria.push(sortBy);
  }

  public async SearchItemsAsync(searchCallback: (result: AuditLogSearchData[]) => void, searchCriteria: AuditLogSearchCriteria, sortingCriteria: SortingCriteria, pagingCriteria: PagingCriteria) {
    var criteria = new AuditLogSearchParameter();
    criteria.Criteria = searchCriteria;
    criteria.SortingCriteria = sortingCriteria;
    criteria.PagingCriteria = pagingCriteria;
    var service = (this.container.get(AuditLogSearchAppService) as AuditLogSearchAppService);

    try {
      var result = await service.FindAsync(criteria);
      searchCallback(result);
    } catch (error) {
      FsUtility.CommonErrorHandler(error);
    }
  }

  CreateCriteria(): AuditLogSearchCriteria {
    var criteria = new AuditLogSearchCriteria();
    criteria.AddedByUserUID = this.SelectedUserId == null ? null : this.SelectedUserId;
    criteria.AuditLogCategoryCode = this.AuditLogCategoryCode == null ? null : this.AuditLogCategoryCode;
    criteria.DateFrom = this.ConvertDate(this.DateFrom);
    criteria.DateTo = this.ConvertDate(this.DateTo);
    return criteria;
  }
  async FindAuditLogCategoryDropdownAsync() {
    var self = this;
    var service = (this.container.get(AuditLogSearchAppService) as AuditLogSearchAppService).Init({ ajaxOptions: { async: false } });

    try {
      var result = await service.FindAuditLogCategoryDropdownAsync();
      self.AuditLogCategoryData01 = result
    } catch (error) {
      FsUtility.CommonErrorHandler(error);
    }
  }
  async FindUserDataAsync(params, success, failure) {
    var self = this;
      var service = this.container.get(ManageUserAppService) as ManageUserAppService;

    if (params.data.term != null) {

      try {
        var result = await service.FindUserAutoCompleteDataAsync(params.data.term);
        self.UserList = result;
        success(result);
      } catch (error) {
        FsUtility.CommonErrorHandler(error);
        failure(error);
      }
    }
  }
  Clear(): void {
    this.SelectedUser = null;
    this.DateFrom = null;
    this.DateTo = null;
    this.AuditLogCategoryCode = null;
  }


}
