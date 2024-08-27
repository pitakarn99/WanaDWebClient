/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-async-promise-executor */

import SearchVMBase2 from "Lib/Fs.SmartClient.Client/SearchVMBase2";
import PagingCriteria from "Lib/Fs.Core.Data/PagingCriteria";
import SortingCriteria from "Lib/Fs.Core.Data/SortingCriteria";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import PlotScoreEditorVM from "./PlotScoreEditorVM";
import { IRouter } from "@aurelia/router";
import { IDialogService } from "@aurelia/dialog";
import template from './PlotScoreSearchView.html';
import { customElement, resolve } from 'aurelia';
import { I18N } from "@aurelia/i18n";
import PlotScoreSearchCriteria from "../../Scripts/AppServiceContract/PlotScoreSearchCriteria";
import PlotScoreAppService from "../../Scripts/AppServiceContract/PlotScoreAppService";
import PlotScoreParameter from "../../Scripts/AppServiceContract/PlotScoreParameter";
import PlotScoreData from "../../Scripts/AppServiceContract/PlotScoreData";
import GeneralPopupEditDialog from "Lib/Fs.Core.Aurelia/Components/GeneralPopupEditDialog";
import NameAndIdData from "../../Scripts/AppServiceContract/NameAndIdData";
import FarmAndPlotData from "../../Scripts/AppServiceContract/FarmAndPlotData";

@customElement({
    name: 'PlotScoreSearchView',
    template
})
export default class PlotScoreSearchVM extends SearchVMBase2<PlotScoreEditorVM, PlotScoreSearchCriteria>{
    Farm: FarmAndPlotData;
    Plot: NameAndIdData;
    StatusCode: string;
    DateFrom: Date;
    DateTo: Date;
   

    router: IRouter = resolve(IRouter)

    i18n: any;

       
    dialogService: IDialogService = resolve(IDialogService)
    constructor() {
        super(PlotScoreEditorVM);
        var self = this;
       
        this.i18n = this.container.get(I18N);
        this.SearchAsync();

    }


    async SearchItemsAsync(searchCallback: (result: PlotScoreData[]) => void, searchCriteria: PlotScoreSearchCriteria, sortingCriteria: SortingCriteria, pagingCriteria: PagingCriteria) {
        const self = this;

        const service = this.container.get(PlotScoreAppService) as PlotScoreAppService;

        const criteria = new PlotScoreParameter();
        criteria.Criteria = searchCriteria;
        criteria.SortingCriteria = sortingCriteria;
        criteria.PagingCriteria = pagingCriteria;

        try {
            const result = await service.FindAsync(criteria) as PlotScoreData[];
            searchCallback(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }



    async CountItemsAsync(countCallback: (result: number) => void) {
        var self = this;
        const req = self.CreateCriteria();

        const service = this.container.get(PlotScoreAppService) as PlotScoreAppService;

        try {
            const result = await service.CountAsync(req);
            countCallback(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    CreateCriteria(): PlotScoreSearchCriteria {
        const cri = new PlotScoreSearchCriteria();
        cri.FarmId = this.Farm == null ? null : this.Farm.Id;
        cri.PlotId = this.Plot == null ? null : this.Plot.Id;
        cri.From = FsUtility.ToJsonDate(this.DateFrom)
        cri.To = FsUtility.ToJsonDate(this.DateTo)
      
        cri.StatusCode = this.StatusCode;
        return cri;
    }
    ClearAsync() {
        this.Farm = null;
        this.Plot = null;
        this.DateFrom = null;
        this.DateTo = null;
        this.SearchAsync();
    }

   
    async ViewData(editorVM) {
        const self = this;

        editorVM.Parent = self;
        const text = await import("./PlotScoreDialogView.html");

        self.dialogService
            .open({
                component: () => GeneralPopupEditDialog,
                model: {
                    view: text.default,
                    viewModel: editorVM,
                    ModalClass: "modal",
                    Header: "Verify Request",
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
            PlotScoreAppService
        ) as PlotScoreAppService;

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
