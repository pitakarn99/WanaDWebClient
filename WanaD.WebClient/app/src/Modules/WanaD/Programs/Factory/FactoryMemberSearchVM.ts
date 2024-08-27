/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-async-promise-executor */

import SearchVMBase2 from "Lib/Fs.SmartClient.Client/SearchVMBase2";
import PagingCriteria from "Lib/Fs.Core.Data/PagingCriteria";
import SortingCriteria from "Lib/Fs.Core.Data/SortingCriteria";
import SortBy from "Lib/Fs.Core.Data/SortBy";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import { IRouter } from "@aurelia/router";
import template from './FactoryMemberView.html';
import { customElement, resolve, transient } from 'aurelia';
import FactoryMemberEditorVM from "./FactoryMemberEditorVM";
import FactoryMemberSearchCriteria from "../../Scripts/AppServiceContract/FactoryMemberSearchCriteria";
import FactoryMemberData from "../../Scripts/AppServiceContract/FactoryMemberData";
import FactoryMemberParameter from "../../Scripts/AppServiceContract/FactoryMemberParameter";
import { IValidationController } from "@aurelia/validation-html";
import { newInstanceForScope } from "@aurelia/kernel";
import { IDialogService } from "@aurelia/dialog";
import GeneralPopupEditDialog from "../../../../Lib/Fs.Core.Aurelia/Components/GeneralPopupEditDialog";
import FactoryAppService from "../../Scripts/AppServiceContract/FactoryAppService";

@customElement({
    name: 'FactoryMemberView',
    template
})
@transient


export default class FactoryMemberSearchVM extends SearchVMBase2<FactoryMemberEditorVM, FactoryMemberSearchCriteria>{
    Id: string;
    FactoryId: string;
    PlotId: string;
    UserId: string;
    Role: string;
    router: IRouter = resolve(IRouter);
    ListFactoryMember = [
        { id: 'FactoryManager', name: 'FactoryManager' },
        { id: 'FactoryStaff', name: 'FactoryStaff' }
    ];

    ValidationController = resolve(newInstanceForScope(IValidationController)) as IValidationController;

    dialogService: IDialogService = resolve(IDialogService);
    constructor() {
        super(FactoryMemberEditorVM);
    }

    Load(factoryId) {
        var self = this;
        self.FactoryId = factoryId;
        self.SearchAsync();
    }

    async SearchItemsAsync(searchCallback: (result: FactoryMemberData[]) => void, searchCriteria: FactoryMemberSearchCriteria, sortingCriteria: SortingCriteria, pagingCriteria: PagingCriteria) {
        const service = this.container.get(FactoryAppService) as FactoryAppService;
        const criteria = new FactoryMemberParameter();
        criteria.Criteria = this.CreateCriteria();
        criteria.SortingCriteria = sortingCriteria;
        criteria.PagingCriteria = pagingCriteria;

        try {
            const result = await service.FindFactoryMemberAsync(criteria) as FactoryMemberData[];
            searchCallback(result);
        }
        catch (error) {
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
        const service = this.container.get(FactoryAppService) as FactoryAppService;
        try {
            const result = await service.FactoryMemberCount(req);
            countCallback(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    CreateCriteria(): FactoryMemberSearchCriteria {
        const cri = new FactoryMemberSearchCriteria();
        cri.FactoryId = this.FactoryId;
        return cri;
    }

    async RemoveCommandAsync(editorVM: FactoryMemberEditorVM) {

        await super.RemoveCommandAsync(editorVM);
    }

    Name: string;
    async ClearAsync(): Promise<void> {
        this.Name = null;
        await this.SearchAsync();
    }

    async ViewData(editorVM: FactoryMemberEditorVM) {
        editorVM.ListFactoryMember = this.ListFactoryMember;
        const text = await import("./FactoryMemberDialogView.html");
        editorVM.IsCreate = false;
        this.dialogService
            .open({
                component: () => GeneralPopupEditDialog,
                model: {
                    view: text.default,
                    viewModel: editorVM,
                    ModalClass: "modal modal-lg",
                    Header: "Factory Member Information",
                    BtnSaveClass: "btn btn-primary",
                    BtnCancelClass: "btn btn-outline-secondary",
                    BtnCloseClass: "btn btn-outline-secondary ",
                    BtnEditorClass: "btn btn-primary",
                },
                lock: false,
            })
            .whenClosed(async (response) => {
                if (response.status === "ok") {
                    const res = response.value as FactoryMemberEditorVM;
                    this.SearchAsync();
                }
                else {
                    await editorVM.EndEditAsync();
                    if (editorVM.HasOriginalSource)
                        await editorVM.LoadOriginalSourceAsync(editorVM.OriginalSource);
                }
            });
    }

    async AddUser() {

        const editorVM = await this.CreateNewItemAsync();
        const text = await import("./FactoryMemberDialogView.html");
        editorVM.FactoryId = this.FactoryId;
        editorVM.ListFactoryMember = this.ListFactoryMember;
        editorVM.ListRole = [];
        editorVM.IsCreate = true;

        this.dialogService
            .open({
                component: () => GeneralPopupEditDialog,
                model: {
                    view: text.default,
                    viewModel: editorVM,
                    ModalClass: "modal modal-lg",
                    Header: "Add Factory Member",
                    BtnSaveClass: "btn btn-primary",
                    BtnCancelClass: "btn btn-outline-secondary",
                    BtnCloseClass: "btn btn-outline-secondary ",
                    BtnEditorClass: "btn btn-primary",
                },
                lock: false,
            })
            .whenClosed(async (response) => {
                if (response.status === "ok") {
                    const res = response.value as FactoryMemberEditorVM;
                    this.SearchAsync();
                }
                else {
                    await this.RemoveCommandAsync(editorVM);
                }
            });
    }

    CheckManager(item) {
        if (item == null) return false;
        return item.some(t => t == "FactoryManager");
    }

    CheckStaff(item) {
        if (item == null) return false;
        return item.some(t => t == "FactoryStaff");
    }







}
