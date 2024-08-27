/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-var */
import SearchVMBase from "Lib/Fs.SmartClient.Client/SearchVMBase";
import PagingCriteria from "Lib/Fs.Core.Data/PagingCriteria";
import SortingCriteria from "Lib/Fs.Core.Data/SortingCriteria";
import SortBy from "Lib/Fs.Core.Data/SortBy";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import UserEditorVM from "./UserEditorVM";
import MemberUpdateRequest from "../../../Core/Scripts/AppServiceContract/MemberUpdateRequest";
import MemberData01 from "../../../Core/Scripts/AppServiceContract/MemberData01";
import ManageUserGroupAppService from "../../Scripts/AppServiceContract/ManageUserGroupAppService";
import ManageUserGroupMemberSearchParameter from "../../Scripts/AppServiceContract/ManageUserGroupMemberSearchParameter";
import UserCriteria01 from "../../../Core/Scripts/UserCriteria01";
import { fs } from "Config/FsConfig";
import UserData01 from "../../Scripts/AppServiceContract/UserData01";
import SearchVMBase2 from "Lib/Fs.SmartClient.Client/SearchVMBase2";
import { IValidationController } from "@aurelia/validation-html";
import { newInstanceForScope } from "@aurelia/kernel";
import template from './UserView.html';
import { customElement } from 'aurelia';

@customElement({
    name: 'UserSearchVM',
    template
})
export default class UserSearchVM extends SearchVMBase2<UserEditorVM, UserCriteria01>{
    UserList: UserData01[];

    GroupId: string;
    SelectedUserId: string;
    SelectedUser: UserData01;

    Template: any;
    ServiceBaseUrl: any;

    DataSourceUser: any;

    criteria: string;

    constructor() {
        super(UserEditorVM); 
        this.ServiceBaseUrl = fs.Config.ServiceBaseUrl;
     
    }

    Load(groupId) {
        var self = this;
        self.GroupId = groupId
        this.criteria = "";
        this.IsSearchAfterSave = true;
        this.IsClearSelectionAfterSave = true;
        new Promise(async () => {
            await self.LoadAsync(groupId);
        });
    }
    async getUserAsync() {
        var self = this;
        var service = this.container.get(ManageUserGroupAppService) as ManageUserGroupAppService;

        try {
            var result = await service.FindUserAutoCompleteDataAsync(this.criteria);
            self.UserList = result;
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    async FindUserDataAsync(params, success, failure) {
        var self = this;
        var service = this.container.get(ManageUserGroupAppService) as ManageUserGroupAppService;

        var data = params.data.term == null ? "" : params.data.term;
        //if (params.data.term != null) {

        try {
            var result = await service.FindUserAutoCompleteDataAsync(data)
            self.UserList = result;
            success(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
            failure(error);
        }
        //}
    }

    async SaveAsync() {
        var self = this;
        var y = self.SelectedUser;
        if (self.SelectedUserId == null) {
            return;
        }

        var request = this.CreateRequest();
        var service = this.container.get(ManageUserGroupAppService) as ManageUserGroupAppService;

        try {
            await service.AddMemberAsync(request);
            self.SetAfterSave();
            await self.SearchAsync();
            FsUtility.AlertModal("The item has been saved successfully", 1, 1);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    SetAfterSave() {
        var self = this;

        self.SelectedUserId = null;
    }

    CreateRequest(): MemberUpdateRequest {
        return {
            GroupUID: this.GroupId,
            UserUID: this.SelectedUserId,
        }
    }

    async getTemplate(e: any) {
        var key = e.target.data('title');
        this.CurrentItem.ErrorList = await this.CurrentItem.getValidateErrors(key);
        return () => this.Template.template
    }

    async LoadAsync(groupId: string) {
        var self = this;
        if (groupId != null && groupId != 'undefined') {
            this.SearchAsync();
            self.GroupId = groupId;
        }
    }

    async SearchItemsAsync(searchCallback: (result: MemberData01[]) => void, searchCriteria: UserCriteria01, sortingCriteria: SortingCriteria, pagingCriteria: PagingCriteria) {
        var self = this;
        var criteria = new ManageUserGroupMemberSearchParameter();
        criteria.Criteria = searchCriteria;
        criteria.SortingCriteria = sortingCriteria;
        criteria.PagingCriteria = pagingCriteria;

        var service = this.container.get(ManageUserGroupAppService) as ManageUserGroupAppService;

        try {
            var result = await service.FindMemberAsync(criteria);
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

        this.SearchCriteria = criteria;

        try {
            var result = await service.CountMemberAsync(criteria);
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
        cri.UserUID = this.GroupId;
        return cri;
    }

    async RemoveItemAsync(item: UserEditorVM) {
        var self = this;
        var service = this.container.get(ManageUserGroupAppService) as ManageUserGroupAppService;

        var request = new MemberUpdateRequest();
        request.GroupUID = this.GroupId;
        request.UserUID = item.Id;

        FsUtility.AlertModal("Are you sure to delete ?", 3, 3, async function (result) {
            if (result == true) {
                try {
                    await service.RemoveMemberAsync(request);
                    FsUtility.AlertModal("The item has been updated successfully", 2, 1);
                    await self.SearchAsync();
                } catch (error) {
                    FsUtility.CommonErrorHandler(error);
                }
            }
        });
    }

    async RemoveAllAsync() {

        var self = this;
        var service = this.container.get(ManageUserGroupAppService) as ManageUserGroupAppService;

        FsUtility.AlertModal("Are you sure to delete ?", 3, 3, async function (result) {
            if (result == true) {

                var failCount = 0;

                for (var i = 0; i < self.SelectedItems.length; i++) {

                    var item = self.SelectedItems[i];

                    var request = new MemberUpdateRequest();
                    request.GroupUID = self.GroupId;
                    request.UserUID = item.Id;

                    try {
                        await service.RemoveMemberAsync(request);
                        await self.SearchAsync();
                    } catch (error) {
                        FsUtility.CommonErrorHandler(error);
                    }
                }
            }
        });
    }



}
