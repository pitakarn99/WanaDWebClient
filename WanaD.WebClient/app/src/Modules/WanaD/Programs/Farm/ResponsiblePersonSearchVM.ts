/* eslint-disable no-debugger */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-async-promise-executor */

import SearchVMBase2 from "Lib/Fs.SmartClient.Client/SearchVMBase2";
import PagingCriteria from "Lib/Fs.Core.Data/PagingCriteria";
import SortingCriteria from "Lib/Fs.Core.Data/SortingCriteria";
import SortBy from "Lib/Fs.Core.Data/SortBy";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import { IRouter } from "@aurelia/router";
import template from './ResponsiblePersonView.html';
import { customElement, resolve, transient } from 'aurelia';
import ResponsiblePersonEditorVM from "./ResponsiblePersonEditorVM";
import ResponsiblePersonSearchCriteria from "../../Scripts/AppServiceContract/ResponsiblePersonSearchCriteria";
import ResponsiblePersonData from "../../Scripts/AppServiceContract/ResponsiblePersonData";
import FarmAppService from "../../Scripts/AppServiceContract/FarmAppService";
import ResponsiblePersonParameter from "../../Scripts/AppServiceContract/ResponsiblePersonParameter";
import { IValidationController } from "@aurelia/validation-html";
import { newInstanceForScope } from "@aurelia/kernel";
import { IDialogService } from "@aurelia/dialog";
import GeneralPopupEditDialog from "../../../../Lib/Fs.Core.Aurelia/Components/GeneralPopupEditDialog";
import PlotData from "../../Scripts/AppServiceContract/PlotData";
import PlotSearchCriteria from "../../Scripts/AppServiceContract/PlotSearchCriteria";

@customElement({
    name: 'ResponsiblePersonView',
    template
})
@transient



export default class ResponsiblePersonSearchVM extends SearchVMBase2<ResponsiblePersonEditorVM, ResponsiblePersonSearchCriteria>{
    Id: string;
    FarmId: string;
    PlotId: string;
    UserId: string;
    Role: string;
    router: IRouter = resolve(IRouter);
    ValidationController = resolve(newInstanceForScope(IValidationController)) as IValidationController;
    ListResponsiblePerson = [
        { id: 'Picker', name: 'Picker' },
        { id: 'PlotManager', name: 'Plot Manager' },
        { id: 'FarmManager', name: 'Farm Manager' }
    ];

    dialogService: IDialogService = resolve(IDialogService);
    constructor() {
        super(ResponsiblePersonEditorVM);
    }

    Load(farmId) {
        var self = this;
        self.FarmId = farmId;
        self.FindPlotName(self.FarmId);
        self.SearchAsync();
    }

    async SearchItemsAsync(searchCallback: (result: ResponsiblePersonData[]) => void, searchCriteria: ResponsiblePersonSearchCriteria, sortingCriteria: SortingCriteria, pagingCriteria: PagingCriteria) {
        const service = this.container.get(FarmAppService) as FarmAppService;
        const criteria = new ResponsiblePersonParameter();
        criteria.Criteria = this.CreateCriteria();
        criteria.SortingCriteria = sortingCriteria;
        criteria.PagingCriteria = pagingCriteria;

        try {
            const result = await service.FindResponsiblePersonAsync(criteria) as ResponsiblePersonData[];
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
        const service = this.container.get(FarmAppService) as FarmAppService;
        try {
            const result = await service.ResponsiblePersonCount(req);
            countCallback(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    CreateCriteria(): ResponsiblePersonSearchCriteria {
        const cri = new ResponsiblePersonSearchCriteria();
        cri.FarmId = this.FarmId;
        return cri;
    }

    async RemoveCommandAsync(editorVM: ResponsiblePersonEditorVM) {
        await super.RemoveCommandAsync(editorVM);
    }


    Name: string;
    async ClearAsync(): Promise<void> {
        this.Name = null;
        await this.SearchAsync();
    }

    async ViewData(editorVM: ResponsiblePersonEditorVM) {
        editorVM.ListResponsiblePerson = this.ListResponsiblePerson;
        const text = await import("./ResponsiblePersonDialogView.html");
        editorVM.selectedPlots = this.AllPlotDatas.filter(t => editorVM.ListPlotId.includes(t.Id));
        editorVM.IsCreate = false;

        this.dialogService
            .open({
                component: () => GeneralPopupEditDialog,
                model: {
                    view: text.default,
                    viewModel: editorVM,
                    ModalClass: "modal modal-lg",
                    Header: "Responsible Person Information",
                    BtnSaveClass: "btn btn-primary",
                    BtnCancelClass: "btn btn-outline-secondary",
                    BtnCloseClass: "btn btn-outline-secondary ",
                    BtnEditorClass: "btn btn-primary",
                },
                lock: false,
            })
            .whenClosed(async (response) => {

                if (response.status === "ok") {
                    const res = response.value as ResponsiblePersonEditorVM;
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
        const text = await import("./ResponsiblePersonDialogView.html");
        editorVM.FarmId = this.FarmId;
        editorVM.ListResponsiblePerson = this.ListResponsiblePerson;
        editorVM.ListRole = [];
        editorVM.selectedPlots = [];
        editorVM.IsCreate = true;

        this.dialogService
            .open({
                component: () => GeneralPopupEditDialog,
                model: {
                    view: text.default,
                    viewModel: editorVM,
                    ModalClass: "modal modal-lg",
                    Header: "Add ResponsiblePerson",
                    BtnSaveClass: "btn btn-primary",
                    BtnCancelClass: "btn btn-outline-secondary",
                    BtnCloseClass: "btn btn-outline-secondary ",
                    BtnEditorClass: "btn btn-primary",
                },
                lock: false,
            })
            .whenClosed(async (response) => {
                if (response.status === "ok") {
                    const res = response.value as ResponsiblePersonEditorVM;
                    this.SearchAsync();
                }
                else {
                    await this.RemoveCommandAsync(editorVM);
                }
            });
    }

    AllPlotDatas: PlotData[];
    async FindPlotName(id) {
        const service = this.container.get(FarmAppService) as FarmAppService;
        try {
            const SearchData = new PlotSearchCriteria;
            SearchData.FarmId = id;
            SearchData.Name = "";

            const result = await service.FindPlotNameAsync(SearchData) as PlotData[];
            this.AllPlotDatas = result;
        }
        catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    CheckPicker(item) {
        if (item == null) return false;
        return item.some(t => t == "Picker");
    }

    CheckPlotManager(item) {
        if (item == null) return false;
        return item.some(t => t == "PlotManager");
    }

    CheckFarmManager(item) {
        if (item == null) return false;
        return item.some(t => t == "FarmManager");
    }







}
