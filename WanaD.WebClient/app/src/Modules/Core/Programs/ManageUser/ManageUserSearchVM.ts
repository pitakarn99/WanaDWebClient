/* eslint-disable no-async-promise-executor */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-this-alias */
import SearchVMBase2 from "Lib/Fs.SmartClient.Client/SearchVMBase2";
import PagingCriteria from "Lib/Fs.Core.Data/PagingCriteria";
import SortingCriteria from "Lib/Fs.Core.Data/SortingCriteria";
import SortBy from "Lib/Fs.Core.Data/SortBy";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import ManageUserEditorVM from "./ManageUserEditorVM";
import UserData01 from "../../../Core/Scripts/AppServiceContract/UserData01";
import ManageUserGroupMemberSearchParameter from "../../Scripts/AppServiceContract/ManageUserGroupMemberSearchParameter";
import UserCriteria01 from "../../../Core/Scripts/UserCriteria01";
import ManageUserAppService from "../../Scripts/AppServiceContract/ManageUserAppService";
import UserData from "../../Scripts/UserData";
import ImportModalVM from "../../Components/Modal/ImportModalVM";
import DetailModalVM from "../../Components/Modal/DetailModalVM";
import { IRouter } from "@aurelia/router";
import { DialogService, IDialogService } from "@aurelia/dialog";
import { IValidationController } from "@aurelia/validation-html";
import { newInstanceForScope } from "@aurelia/kernel";
import GeneralPopupDialog from "Lib/Fs.Core.Aurelia/Components/GeneralPopupDialog";
import template from './ManageUserSearchView.html';
import { customElement, resolve } from 'aurelia';

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
    dialogService: DialogService;
    DefaultGroupCode: string;
    ItemsProvider: any;
    template: any;
    importmodel: DetailModalVM = new DetailModalVM();
    router: IRouter = resolve(IRouter);
    ValidationController = resolve(
        newInstanceForScope(IValidationController)
    ) as IValidationController;
    static inject = [IDialogService];
    constructor(dialogService) {
        super(ManageUserEditorVM);
        var self = this;
        this.dialogService = dialogService;
        this.IsSearchAfterSave = true;
        this.IsClearSelectionAfterSave = true;

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
        var self = this;

        var service = this.container.get(ManageUserAppService) as ManageUserAppService;

        var criteria = new ManageUserGroupMemberSearchParameter();
        criteria.Criteria = searchCriteria;
        criteria.SortingCriteria = sortingCriteria; 
        criteria.PagingCriteria = pagingCriteria;

        try {
            var result = await service.FindAsync(criteria) as UserData01[];
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
        var req = self.CreateCriteria();

        var service = this.container.get(ManageUserAppService) as ManageUserAppService;

        try {
            var result = await service.CountAsync(req);
            countCallback(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    CreateCriteria(): UserCriteria01 {
        var cri = new UserCriteria01();
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
        this.router.load("Modules/Core/UserDetailPage/");
    }

    async OpenModal() {
        var self = this;
        var view = await import("Modules/Core/Components/Modal/DetailModalFileVM.html");
        this.dialogService
            .open({
                component: () => GeneralPopupDialog,
                model: {
                    view: view.default,
                    viewModel: this.importmodel,
                    Header: "Import User",
                    btnclass: "btn btn-pill  btn-white btn-medium",
                },
                lock: false,
            })
            .whenClosed(async response => {
                if (response.status == "ok") {
                    await self.ImportFileAsync(response.value);
                }
            });

    }
        //this.dialogService.open({
        //    viewModel: ImportModalVM,
        //    model: {
        //        viewModel: this.importmodel,
        //        view: PLATFORM.moduleName('Modules/Core/Components/Modal/DetailModalFileView.html'),
        //        IsShowCancel: true,
        //        Header: "Manage User"
        //    }, lock: true
        //}).whenClosed(async response => {
        //    if (!response.wasCancelled) {
        //        await this.ImportFileAsync(response.output);
        //    }
        //});
    
    async ImportFileAsync(obj) {
        try {
            var service = this.container.get(ManageUserAppService) as ManageUserAppService;

            try {
                await service.ImportAsync(obj.Obj);
                FsUtility.AlertModal("The item has been import successfully", 2, 1);
            } catch (error) {
                FsUtility.CommonErrorHandler(error);
            }
            await this.SearchAsync();

        } catch (err) {
            FsUtility.AlertErrorMessage(err);

        }
    }

    InitializeLoadingItem(editorVM: ManageUserEditorVM) {
        editorVM.router = this.router;
    }

}
