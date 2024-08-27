/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-async-promise-executor */

import SearchVMBase2 from "Lib/Fs.SmartClient.Client/SearchVMBase2";
import PagingCriteria from "Lib/Fs.Core.Data/PagingCriteria";
import SortingCriteria from "Lib/Fs.Core.Data/SortingCriteria";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import VisitPlotCollectionEditorVM from "./VisitPlotCollectionEditorVM";
import { IRouter } from "@aurelia/router";
import { IDialogService } from "@aurelia/dialog";
import template from './VisitPlotCollectionSearchView.html';
import { customElement, resolve } from 'aurelia';
import { I18N } from "@aurelia/i18n";
import VisitPlotCollectionSearchCriteria from "../../Scripts/AppServiceContract/VisitPlotCollectionSearchCriteria";
import VisitPlotCollectionAppService from "../../Scripts/AppServiceContract/VisitPlotCollectionAppService";
import VisitPlotCollectionParameter from "../../Scripts/AppServiceContract/VisitPlotCollectionParameter";
import VisitPlotCollectionData from "../../Scripts/AppServiceContract/VisitPlotCollectionData";
import GeneralPopupEditDialog from "Lib/Fs.Core.Aurelia/Components/GeneralPopupEditDialog";
import NameAndIdData from "../../Scripts/AppServiceContract/NameAndIdData";
import FarmAndPlotData from "../../Scripts/AppServiceContract/FarmAndPlotData";

@customElement({
    name: 'VisitPlotCollectionSearchView',
    template
})
export default class VisitPlotCollectionSearchVM extends SearchVMBase2<VisitPlotCollectionEditorVM, VisitPlotCollectionSearchCriteria>{
    Farm: FarmAndPlotData;
    Plot: NameAndIdData;
    DateFrom: Date;
    DateTo: Date;
   

    router: IRouter = resolve(IRouter)

    i18n: any;

       
    dialogService: IDialogService = resolve(IDialogService)
    constructor() {
        super(VisitPlotCollectionEditorVM);
        var self = this;
       
        this.i18n = this.container.get(I18N);
        this.SearchAsync();

    }


    async SearchItemsAsync(searchCallback: (result: VisitPlotCollectionData[]) => void, searchCriteria: VisitPlotCollectionSearchCriteria, sortingCriteria: SortingCriteria, pagingCriteria: PagingCriteria) {
        const self = this;

        const service = this.container.get(VisitPlotCollectionAppService) as VisitPlotCollectionAppService;

        const criteria = new VisitPlotCollectionParameter();
        criteria.Criteria = searchCriteria;
        criteria.SortingCriteria = sortingCriteria;
        criteria.PagingCriteria = pagingCriteria;

        try {
            const result = await service.FindAsync(criteria) as VisitPlotCollectionData[];
            searchCallback(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }



    async CountItemsAsync(countCallback: (result: number) => void) {
        var self = this;
        const req = self.CreateCriteria();

        const service = this.container.get(VisitPlotCollectionAppService) as VisitPlotCollectionAppService;

        try {
            const result = await service.CountAsync(req);
            countCallback(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    CreateCriteria(): VisitPlotCollectionSearchCriteria {
        const cri = new VisitPlotCollectionSearchCriteria();
        cri.FarmId = this.Farm == null ? null : this.Farm.Id;
        cri.PlotId = this.Plot == null ? null : this.Plot.Id;
        cri.From = FsUtility.ToJsonDate(this.DateFrom)
        cri.To = FsUtility.ToJsonDate(this.DateTo)

        return cri;
    }
    ClearAsync() {
        this.Farm = null;
        this.Plot = null;
        this.DateFrom = null;
        this.DateTo = null;
        this.SearchAsync();
    }

    async CreateNewItemThis() {
        const self = this;
        const editorVM = await self.CreateNewItemAsync();
        editorVM.Parent = self;
        const text = await import("./VisitPlotCollectionDialogView.html");

        self.dialogService
            .open({
                component: () => GeneralPopupEditDialog,
                model: {
                    view: text.default,
                    viewModel: editorVM,
                    ModalClass: "modal",
                    Header: "Field data Collection",
                    BtnSaveClass: "btn btn-primary",
                    BtnCancelClass: "btn btn-outline-secondary",
                    BtnCloseClass: "btn btn-outline-secondary ",
                    BtnEditorClass: "btn btn-primary",
                },
                lock: false,
            })
            .whenClosed(async (response) => {

                if (response.status === "ok") {
                    
                }
                else {
                    await self.RemoveCommandAsync(editorVM);
                }
            });
    }
    async ViewData(editorVM) {
        const self = this;

        editorVM.Parent = self;
        const text = await import("./VisitPlotCollectionDialogView.html");

        self.dialogService
            .open({
                component: () => GeneralPopupEditDialog,
                model: {
                    view: text.default,
                    viewModel: editorVM,
                    ModalClass: "modal",
                    Header: "Field data Collection",
                    BtnSaveClass: "btn btn-primary",
                    BtnCancelClass: "btn btn-outline-secondary",
                    BtnCloseClass: "btn btn-outline-secondary ",
                    BtnEditorClass: "btn btn-primary",
                },
                lock: false,
            })
            .whenClosed(async (response) => {

                if (response.status === "ok") {
                    
                }
                else {
                    await self.RemoveCommandAsync(editorVM);
                }
            });
    }
    FindFarmAsync(obj) {
        const self = this;
        const params = obj.params,
            success = obj.success,
            failure = obj.failure;
        if (params == undefined && success == undefined && failure == undefined) {
            return;
        }
        const service = this.container.get(
            VisitPlotCollectionAppService
        ) as VisitPlotCollectionAppService;

        if (params?.data?.term != null) {
            service
                .FindFarmAsync(params.data.term)
                .done(function (result) {
                    success(result);
                })
                .fail(function (error) {
                    FsUtility.CommonErrorHandler(error);
                    failure(error);
                });
        }
    }
 
  
}
