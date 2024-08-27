import SearchVMBase2 from "Lib/Fs.SmartClient.Client/SearchVMBase2";
import PagingCriteria from "Lib/Fs.Core.Data/PagingCriteria";
import SortingCriteria from "Lib/Fs.Core.Data/SortingCriteria";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import ManageEvaluateBiodiversityContractEditorVM from "./ManageEvaluateBiodiversityContractEditorVM";
import { IRouter } from "@aurelia/router";
import template from './ManageEvaluateBiodiversityContractSearchView.html';
import { customElement, resolve } from 'aurelia';
import { I18N } from "@aurelia/i18n";
import BiodiversityContractSearchCriteria from "../../Scripts/AppServiceContract/BiodiversityContractSearchCriteria";
import ManageBiodiversityContractAppService from "../../Scripts/AppServiceContract/ManageBiodiversityContractAppService";
import BiodiversityContractParameter from "../../Scripts/AppServiceContract/BiodiversityContractParameter";
import BiodiversityContractData from "../../Scripts/AppServiceContract/BiodiversityContractData";
import GeneralPopupEditDialog from "Lib/Fs.Core.Aurelia/Components/GeneralPopupEditDialog";

@customElement({
    name: 'ManageEvaluateBiodiversityContractSearchView',
    template
})
export default class ManageEvaluateBiodiversityContractSearchVM extends SearchVMBase2<ManageEvaluateBiodiversityContractEditorVM, BiodiversityContractSearchCriteria>{
    ContractNo: string;
    PaymentRequestNo: string;
    StartDate: Date;
    EndDate: Date;
    StatusCode: string;

    router: IRouter = resolve(IRouter)

    i18n: any;

       
    constructor() {
        super(ManageEvaluateBiodiversityContractEditorVM);
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
            const result = await service.FindEvaluateAsync(criteria) as BiodiversityContractData[];
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
            const result = await service.CountEvaluateAsync(req);
            countCallback(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    CreateCriteria(): BiodiversityContractSearchCriteria {
        const cri = new BiodiversityContractSearchCriteria();
        cri.ContractNo = $.trim(this.ContractNo);
        cri.PaymentRequestNo = $.trim(this.PaymentRequestNo);
        cri.StartDate = FsUtility.ToJsonDate(this.StartDate)
        cri.EndDate = FsUtility.ToJsonDate(this.EndDate)
        cri.StatusCode = $.trim(this.StatusCode);
        return cri;
    }
    ClearAsync() {
        this.ContractNo = null;
        this.PaymentRequestNo = null;
        this.StartDate = null;
        this.EndDate = null;
        this.StatusCode = null;
    }

    
    editorVM: ManageEvaluateBiodiversityContractEditorVM;
    PlotScoreValidate: boolean = true;
    async ViewData(editorVM) {
        this.editorVM = editorVM;

        $("#InformationModal" ).modal("show");
    }
    async Test() {
        try {
            const service = this.container.get(ManageBiodiversityContractAppService) as ManageBiodiversityContractAppService;

            await service.BackgroundJobBiodiversityContract();
           
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }
    async PassFail(item) {
        this.PlotScoreValidate = this.editorVM.PlotScore != null;
        if (this.PlotScoreValidate) {
            FsUtility.AlertModal("Are you sure you want to " + item + " this item?", 3, 3, async (result) => {
                if (result) {
                    const service = this.container.get(ManageBiodiversityContractAppService) as ManageBiodiversityContractAppService;
                    try {
                        const request = new BiodiversityContractData();
                        request.StatusCode = item;
                        request.PlotScore = this.editorVM.PlotScore;
                        await service.UpdateEvaluateAsync(request);
                        $("#InformationModal").modal("hide");
                        this.PlotScoreValidate = true;
                        this.SearchAsync();
                    } catch (error) {
                        FsUtility.CommonErrorHandler(error);
                    }
                }

            })
        }
        
        
    }

}
