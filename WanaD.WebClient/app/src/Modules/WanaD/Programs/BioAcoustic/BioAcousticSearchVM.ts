/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-async-promise-executor */

import SearchVMBase2 from "Lib/Fs.SmartClient.Client/SearchVMBase2";
import PagingCriteria from "Lib/Fs.Core.Data/PagingCriteria";
import SortingCriteria from "Lib/Fs.Core.Data/SortingCriteria";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import BioAcousticEditorVM from "./BioAcousticEditorVM";
import { IRouter } from "@aurelia/router";
import { IDialogService } from "@aurelia/dialog";
import template from './BioAcousticSearchView.html';
import { customElement, resolve } from 'aurelia';
import { I18N } from "@aurelia/i18n";
import BioAcousticSearchCriteria from "../../Scripts/AppServiceContract/BioAcousticSearchCriteria";
import BioAcousticAppService from "../../Scripts/AppServiceContract/BioAcousticAppService";
import BioAcousticParameter from "../../Scripts/AppServiceContract/BioAcousticParameter";
import BioAcousticData from "../../Scripts/AppServiceContract/BioAcousticData";
import GeneralPopupEditDialog from "Lib/Fs.Core.Aurelia/Components/GeneralPopupEditDialog";
import VisitPlotCollectionAppService from "../../Scripts/AppServiceContract/VisitPlotCollectionAppService";
import FarmAndPlotData from "../../Scripts/AppServiceContract/FarmAndPlotData";
import NameAndIdData from "../../Scripts/AppServiceContract/NameAndIdData";

@customElement({
    name: 'BioAcousticSearchView',
    template
})
export default class BioAcousticSearchVM extends SearchVMBase2<BioAcousticEditorVM, BioAcousticSearchCriteria>{

    Farm: FarmAndPlotData;
    Plot: NameAndIdData;
    DateFrom: Date;
    DateTo: Date;
    router: IRouter = resolve(IRouter)
    i18n: any;

       
    dialogService: IDialogService = resolve(IDialogService)
    constructor() {
        super(BioAcousticEditorVM);    
        this.i18n = this.container.get(I18N);
        this.SearchAsync();

    }


    async SearchItemsAsync(searchCallback: (result: BioAcousticData[]) => void, searchCriteria: BioAcousticSearchCriteria, sortingCriteria: SortingCriteria, pagingCriteria: PagingCriteria) {
        const self = this;

        const service = this.container.get(BioAcousticAppService) as BioAcousticAppService;
        const criteria = new BioAcousticParameter();
        criteria.Criteria = searchCriteria;
        criteria.SortingCriteria = sortingCriteria;
        criteria.PagingCriteria = pagingCriteria;

        try {
            const result = await service.FindAsync(criteria) as BioAcousticData[];
            searchCallback(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }



    async CountItemsAsync(countCallback: (result: number) => void) {
        var self = this;
        const req = self.CreateCriteria();

        const service = this.container.get(BioAcousticAppService) as BioAcousticAppService;

        try {
            const result = await service.CountAsync(req);
            countCallback(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    CreateCriteria(): BioAcousticSearchCriteria {
        const cri = new BioAcousticSearchCriteria();
        cri.FarmId = this.Farm ==null? null: this.Farm.Id;
        cri.PlotId = this.Plot == null ? null : this.Plot.Id;
        cri.From = FsUtility.ToJsonDate(this.DateFrom)
        cri.To = FsUtility.ToJsonDate(this.DateTo)
      
        return cri;
    }


   
    async ViewData(editorVM) {
        const self = this;

        editorVM.Parent = self;
        const text = await import("./BioAcousticDialogView.html");

        self.dialogService
            .open({
                component: () => GeneralPopupEditDialog,
                model: {
                    view: text.default,
                    viewModel: editorVM,
                    ModalClass: "modal",
                    Header: "View Bio Acoustic Data",
                    BtnSaveClass: "d-none",
                    BtnCancelClass: "d-none",
                    BtnCloseClass: "btn btn-primary",
                    BtnEditorClass: "d-none",
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
    ClearAsync() {
        this.Farm = null;
        this.Plot = null;
        this.DateFrom = null;
        this.DateTo = null;
        this.SearchAsync();
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
