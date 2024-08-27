/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-async-promise-executor */

import SearchVMBase2 from "Lib/Fs.SmartClient.Client/SearchVMBase2";
import PagingCriteria from "Lib/Fs.Core.Data/PagingCriteria";
import SortingCriteria from "Lib/Fs.Core.Data/SortingCriteria";
import SortBy from "Lib/Fs.Core.Data/SortBy";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import { IRouter } from "@aurelia/router";
import template from './PlotView.html';
import { customElement, resolve, transient } from 'aurelia';
import PlotEditorVM from "./PlotEditorVM";
import PlotSearchCriteria from "../../Scripts/AppServiceContract/PlotSearchCriteria";
import PlotData from "../../Scripts/AppServiceContract/PlotData";
import FarmAppService from "../../Scripts/AppServiceContract/FarmAppService";
import PlotParameter from "../../Scripts/AppServiceContract/PlotParameter";
import { IValidationController } from "@aurelia/validation-html";
import { newInstanceForScope } from "@aurelia/kernel";
import { IDialogService } from "@aurelia/dialog";
import GeneralPopupEditDialog from "../../../../Lib/Fs.Core.Aurelia/Components/GeneralPopupEditDialog";
import BankData from "../../Scripts/AppServiceContract/BankData";

@customElement({
    name: 'PlotView',
    template
})
@transient



export default class PlotSearchVM extends SearchVMBase2<PlotEditorVM, PlotSearchCriteria>{
    Id: string;
    FarmId: string;
    Name: string;
    router: IRouter = resolve(IRouter);
    ValidationController = resolve(newInstanceForScope(IValidationController)) as IValidationController;

    dialogService: IDialogService = resolve(IDialogService);

    constructor() {
        super(PlotEditorVM);

        this.FindBank();
    }

    Load(farmId) {
        
        var self = this;
        self.FarmId = farmId;
        self.SearchAsync();
    }

    async SearchItemsAsync(searchCallback: (result: PlotData[]) => void, searchCriteria: PlotSearchCriteria, sortingCriteria: SortingCriteria, pagingCriteria: PagingCriteria) {
        
        const service = this.container.get(FarmAppService) as FarmAppService;
        const criteria = new PlotParameter();
        criteria.Criteria = this.CreateCriteria();
        criteria.SortingCriteria = sortingCriteria;
        criteria.PagingCriteria = pagingCriteria;

        try {
            const result = await service.FindPlotAsync(criteria) as PlotData[];
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
        const self = this;
        const req = self.CreateCriteria();
        const service = this.container.get(FarmAppService) as FarmAppService;
        try {
            const result = await service.PlotCount(req);
            countCallback(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    CreateCriteria(): PlotSearchCriteria {
        const cri = new PlotSearchCriteria();
        cri.Name = this.Name == null ? "" : this.Name.trim();
        cri.FarmId = this.FarmId;
        return cri;
    }

    async RemoveCommandAsync(editorVM: PlotEditorVM) {
        await super.RemoveCommandAsync(editorVM);
    }

    async ClearAsync(): Promise<void> {
        this.Name = null;
        await this.SearchAsync();
    }

    async ViewData(editorVM) {
        const self = this;

        const text = await import("./PlotDialogView.html");
        editorVM.Parent = self;
        this.dialogService
            .open({
                component: () => GeneralPopupEditDialog,
                model: {
                    view: text.default,
                    viewModel: editorVM,
                    ModalClass: "modal modal-lg",
                    Header: "Plot Information",
                    BtnSaveClass: "btn btn-primary",
                    BtnCancelClass: "btn btn-outline-secondary",
                    BtnCloseClass: "btn btn-outline-secondary ",
                    BtnEditorClass: "btn btn-primary",
                },
                lock: false,
            })
            .whenClosed(async (response) => {
                if (response.status === "ok") {
                    const res = response.value as PlotEditorVM;
                    self.SearchAsync();
                }
                else {
                    await editorVM.EndEditAsync();
                    if (editorVM.HasOriginalSource)
                        await editorVM.LoadOriginalSourceAsync(editorVM.OriginalSource);
                }
            });
    }

    async AddPlot() {
        const self = this;
        const editorVM = await self.CreateNewItemAsync();
        editorVM.FarmId = self.FarmId;
        editorVM.Parent = self;
        const text = await import("./PlotDialogView.html");

        self.dialogService
            .open({
                component: () => GeneralPopupEditDialog,
                model: {
                    view: text.default,
                    viewModel: editorVM,
                    ModalClass: "modal modal-lg",
                    Header: "Add Plot",
                    BtnSaveClass: "btn btn-primary",
                    BtnCancelClass: "btn btn-outline-secondary",
                    BtnCloseClass: "btn btn-outline-secondary ",
                    BtnEditorClass: "btn btn-primary",
                },
                lock: false,
            })
            .whenClosed(async (response) => {
                if (response.status === "ok") {
                    const res = response.value as PlotEditorVM;
                    self.SearchAsync();
                }
                else {
                    await self.RemoveCommandAsync(editorVM);
                }
            });
    }

    BankDatas: any;
    async FindBank() {
        const service = this.container.get(FarmAppService) as FarmAppService;
        try {
            const result = await service.FindBankAsync() as BankData[];
            this.BankDatas = result;
        }
        catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }




}
