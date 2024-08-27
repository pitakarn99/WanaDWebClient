/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-async-promise-executor */

import SearchVMBase2 from "Lib/Fs.SmartClient.Client/SearchVMBase2";
import PagingCriteria from "Lib/Fs.Core.Data/PagingCriteria";
import SortingCriteria from "Lib/Fs.Core.Data/SortingCriteria";
import SortBy from "Lib/Fs.Core.Data/SortBy";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import ManageUserEditorVM from "./ManageUserEditorVM";
import UserData01 from "../../../Core/Scripts/AppServiceContract/UserData01";



import { IRouter } from "@aurelia/router";
import template from './ManageUserSearchView.html';
import { customElement, resolve } from 'aurelia';
import ManageUserAppService from "../../Scripts/AppServiceContract/ManageUserAppService";
import UserCriteria01 from "../../../Core/Scripts/UserCriteria01";
import ManageUserGroupMemberSearchParameter from "../../Scripts/AppServiceContract/ManageUserGroupMemberSearchParameter";
import { I18N } from "@aurelia/i18n";

@customElement({
    name: 'ManageUserSearchView',
    template
})
export default class ManageUserSearchVM extends SearchVMBase2<ManageUserEditorVM, UserCriteria01>{
    Code: string;
    Name: string;
    IsActive: boolean;
    IsActiveList: [];
    IsLocked: boolean;
    IsLockedList: [];
    DefaultGroupCode: string;
    ItemsProvider: any;
    template: any;
    router: IRouter = resolve(IRouter)
    i18n: any;


    constructor() {
        super(ManageUserEditorVM);
        var self = this;


        this.IsSearchAfterSave = true;
        this.IsClearSelectionAfterSave = true;
        this.i18n = this.container.get(I18N);

        new Promise(async () => {
            await this.SearchAsync();
        });

    }
    //getTemplate(e: any) {
    //    var key = e.target.data('title');
    //    this.CurrentItem.ErrorList = this.CurrentItem.getValidateErrors(key);
    //    return () => this.template.template
    //}

    async SearchItemsAsync(searchCallback: (result: UserData01[]) => void, searchCriteria: UserCriteria01, sortingCriteria: SortingCriteria, pagingCriteria: PagingCriteria) {
        const self = this;

        const service = this.container.get(ManageUserAppService) as ManageUserAppService;

        const criteria = new ManageUserGroupMemberSearchParameter();
        criteria.Criteria = searchCriteria;
        criteria.SortingCriteria = sortingCriteria;
        criteria.PagingCriteria = pagingCriteria;

        try {
            const result = await service.FindAsync(criteria) as UserData01[];
            searchCallback(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    PrepareDefaultSortingCriteria(sortingCriteria: SortingCriteria) {
        const sortBy = new SortBy();
        sortBy.Direction = 0;
        sortBy.Name = "Name";
        sortingCriteria.push(sortBy);
    }

    async CountItemsAsync(countCallback: (result: number) => void) {
        var self = this;
        const req = self.CreateCriteria();

        const service = this.container.get(ManageUserAppService) as ManageUserAppService;

        try {
            const result = await service.CountAsync(req);
            countCallback(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    CreateCriteria(): UserCriteria01 {
        const cri = new UserCriteria01();
        cri.Name = $.trim(this.Name);
        cri.IsGroup = false;
        return cri;
    }

    async RemoveCommandAsync(editorVM: ManageUserEditorVM) {
        await super.RemoveCommandAsync(editorVM);
    }

    async ClearAsync(): Promise<void> {
        this.Code = null;
        this.Name = null;
        this.IsActive = null;
        await this.SearchAsync();
    }

    AddCommand() {
        this.router.load("Modules/WanaD/UserDetailPage/");
    }


    InitializeLoadingItem(editorVM: ManageUserEditorVM) {
        editorVM.router = this.router;
    }

}
