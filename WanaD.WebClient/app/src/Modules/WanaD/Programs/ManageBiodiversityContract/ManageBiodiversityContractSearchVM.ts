/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-async-promise-executor */

import SearchVMBase2 from "Lib/Fs.SmartClient.Client/SearchVMBase2";
import PagingCriteria from "Lib/Fs.Core.Data/PagingCriteria";
import SortingCriteria from "Lib/Fs.Core.Data/SortingCriteria";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import ManageBiodiversityContractEditorVM from "./ManageBiodiversityContractEditorVM";
import { IRouter } from "@aurelia/router";
import { IDialogService } from "@aurelia/dialog";
import template from './ManageBiodiversityContractSearchView.html';
import { customElement, resolve } from 'aurelia';
import { I18N } from "@aurelia/i18n";
import BiodiversityContractSearchCriteria from "../../Scripts/AppServiceContract/BiodiversityContractSearchCriteria";
import ManageBiodiversityContractAppService from "../../Scripts/AppServiceContract/ManageBiodiversityContractAppService";
import BiodiversityContractParameter from "../../Scripts/AppServiceContract/BiodiversityContractParameter";
import BiodiversityContractData from "../../Scripts/AppServiceContract/BiodiversityContractData";
import GeneralPopupEditDialog from "Lib/Fs.Core.Aurelia/Components/GeneralPopupEditDialog";

@customElement({
    name: 'ManageBiodiversityContractSearchView',
    template
})
export default class ManageBiodiversityContractSearchVM extends SearchVMBase2<ManageBiodiversityContractEditorVM, BiodiversityContractSearchCriteria>{
    ContractNo: string;
    PaymentRequestNo: string;
    StartDate: Date;
    EndDate: Date;
    StatusCode: string;

    router: IRouter = resolve(IRouter)

    i18n: any;

       
    dialogService: IDialogService = resolve(IDialogService)
    constructor() {
        super(ManageBiodiversityContractEditorVM);
        var self = this;
       
        this.i18n = this.container.get(I18N);
        this.SearchAsync();

    }


    async SearchItemsAsync(searchCallback: (result: BiodiversityContractData[]) => void, searchCriteria: BiodiversityContractSearchCriteria, sortingCriteria: SortingCriteria, pagingCriteria: PagingCriteria) {
        const self = this;

        const service = this.container.get(ManageBiodiversityContractAppService) as ManageBiodiversityContractAppService;

        const criteria = new BiodiversityContractParameter();
        criteria.Criteria = searchCriteria;
        criteria.SortingCriteria = sortingCriteria;
        criteria.PagingCriteria = pagingCriteria;

        try {
            const result = await service.FindAsync(criteria) as BiodiversityContractData[];
            searchCallback(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }



    async CountItemsAsync(countCallback: (result: number) => void) {
        var self = this;
        const req = self.CreateCriteria();

        const service = this.container.get(ManageBiodiversityContractAppService) as ManageBiodiversityContractAppService;

        try {
            const result = await service.CountAsync(req);
            countCallback(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    CreateCriteria(): BiodiversityContractSearchCriteria {
        const cri = new BiodiversityContractSearchCriteria();
        cri.ContractNo = $.trim(this.ContractNo);
        cri.StartDate = FsUtility.ToJsonDate(this.StartDate)
        cri.EndDate = FsUtility.ToJsonDate(this.EndDate)
        cri.StatusCode = $.trim(this.StatusCode);
        return cri;
    }
    ClearAsync() {
        this.ContractNo = null;
       
        this.StartDate = null;
        this.EndDate = null;
        this.StatusCode = null;
        this.SearchAsync();
    }

    async CreateNewItemThis() {
        const self = this;
        const editorVM = await self.CreateNewItemAsync();
        editorVM.Parent = self;
        const text = await import("./ManageBiodiversityContractDialogView.html");

        self.dialogService
            .open({
                component: () => GeneralPopupEditDialog,
                model: {
                    view: text.default,
                    viewModel: editorVM,
                    ModalClass: "modal",
                    Header: "New Contract",
                    BtnSaveClass: "btn btn-primary",
                    BtnCancelClass: "btn btn-outline-secondary",
                    BtnCloseClass: "btn btn-outline-secondary ",
                    BtnEditorClass: "btn btn-primary",
                },
                lock: false,
            })
            .whenClosed(async (response) => {

                if (response.status === "ok") {
                    //
                }
                else {
                    await self.RemoveCommandAsync(editorVM);
                }
            });
    }
    editorVM: ManageBiodiversityContractEditorVM;
    async ViewData(editorVM) {
        this.editorVM = editorVM;
        editorVM.Parent = self;
        $("#InformationModal" ).modal("show");
    }
    async CancelContract() {
        FsUtility.AlertModal("Are you sure you want to Cancel Contract?", 3, 3, async (result) => {
            if (result) {
                const service = this.container.get(ManageBiodiversityContractAppService) as ManageBiodiversityContractAppService;
                try {
                    await service.CancelContract(this.editorVM.Id);
                    $("#InformationModal").modal("hide");
                    this.SearchAsync();
                } catch (error) {
                    FsUtility.CommonErrorHandler(error);
                }
            }

        })
        
    }

}
