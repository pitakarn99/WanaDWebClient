/* eslint-disable @typescript-eslint/no-this-alias */

import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import { IRouter } from "@aurelia/router";
import BiodiversityContractData from "../../Scripts/AppServiceContract/BiodiversityContractData";
import ManageBiodiversityContractAppService from "../../Scripts/AppServiceContract/ManageBiodiversityContractAppService";
import { newInstanceForScope, resolve } from "aurelia";
import BiodiversityContractFarmSearchCriteria from "../../Scripts/AppServiceContract/BiodiversityContractFarmSearchCriteria";
import { IValidationRules } from "@aurelia/validation";
import { IValidationController } from "@aurelia/validation-html";
import ManageBiodiversityContractSearchVM from "./ManageBiodiversityContractSearchVM";


export default class ManageBiodiversityContractEditorVM extends EditorVMBase {
    Id: string;
    ContractNo: string;
    FarmName: string;
    OwnerName: string;
    FarmId: string;
    PlotName: string;
    PlotId: string;
    Area: number
    StartDate: Date;
    EndDate: Date;
    Amount: number
    Factor: number;
    MinimumScore: number;
    StatusCode: string;
    StatusName: string;
    WorkflowDocumentId: string;
    router = resolve(IRouter)
    PlotItem: any;
    Farm: any;
    ValidationController = resolve(
        IValidationController
    ) as IValidationController;
    ValidationRules = resolve(IValidationRules) as IValidationRules;
    Parent: ManageBiodiversityContractSearchVM;
    constructor() {
        super();
        this.ValidationRules.on(this)
            .ensure('Farm').required().withMessage('Farm is required.')
            .ensure('PlotItem').required().withMessage('Plot is required.')
            .ensure('StartDate').required().withMessage('Start Date is required.')
            .ensure('EndDate').required().withMessage('End Date is required.')
            .ensure('Factor').required().withMessage('Factor is required.')
            .ensure('MinimumScore').required().withMessage('Minimum Score is required.')
    }

    async LoadOriginalSourceAsync(originalSource: BiodiversityContractData) {
        this.Id = originalSource.Id;
        this.ContractNo = originalSource.ContractNo;
        this.FarmName = originalSource.FarmName;
        this.OwnerName = originalSource.OwnerName;
        this.FarmId = originalSource.FarmId;
        this.PlotName = originalSource.PlotName;
        this.PlotId = originalSource.PlotId;
        this.Area = originalSource.Area;
        this.StartDate = FsUtility.CreateDateObject(FsUtility.ParseDate(originalSource.StartDate, 1)
        );
        this.EndDate = FsUtility.CreateDateObject(FsUtility.ParseDate(originalSource.EndDate, 1)
        );
        this.Amount = originalSource.Amount;
        this.Factor = originalSource.Factor;
        this.MinimumScore = originalSource.MinimumScore;
        this.StatusCode = originalSource.StatusCode;
        this.StatusName = originalSource.StatusName;
        this.WorkflowDocumentId = originalSource.WorkflowDocumentId;
    }
    async SaveOriginalSourceAsync(originalSource: BiodiversityContractData) {
        originalSource.Id = this.Id;
        originalSource.ContractNo = this.ContractNo;
        originalSource.FarmName = this.FarmName;
        originalSource.OwnerName = this.OwnerName;
        originalSource.FarmId = this.FarmId;
        originalSource.PlotName = this.PlotName;
        originalSource.PlotId = this.PlotId;
        originalSource.Area = this.Area;
        originalSource.StartDate = this.StartDate;
        originalSource.EndDate = this.EndDate;
        originalSource.Amount = this.Amount;
        originalSource.Factor = this.Factor;
        originalSource.MinimumScore = this.MinimumScore;
        originalSource.StatusCode = this.StatusCode;
        originalSource.StatusName = this.StatusName;
        originalSource.WorkflowDocumentId = this.WorkflowDocumentId;

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
            ManageBiodiversityContractAppService
        ) as ManageBiodiversityContractAppService;

        if (params?.data?.term != null) {

            const x = new BiodiversityContractFarmSearchCriteria();
            x.Name = params.data.term

            service
                .FindFarmAsync(x)
                .done(function (result) {
                    success(result);
                })
                .fail(function (error) {
                    FsUtility.CommonErrorHandler(error);
                    failure(error);
                });
        }
    }

    async SaveAsync(doneCallback: () => void, failCallback: (error) => void) {
        const self = this;
        const service = this.container.get(ManageBiodiversityContractAppService) as ManageBiodiversityContractAppService;
        const request = self.CreateRequestAsync();


        try {
             await service.AddAsync(request);
            FsUtility.AlertModal("The item has been saved successfully", 2, 1, async function () {
                if (doneCallback != null) {
                    doneCallback();
                }
                
                await self.EndEditAsync();
                await self.Parent.SearchAsync();

            });

        } catch (error) {
            FsUtility.CommonErrorHandler(error);

        }
    }
    CreateRequestAsync(): BiodiversityContractData {

        const request = new BiodiversityContractData();
        request.PlotId = this.PlotItem.Id;
        request.StartDate = FsUtility.ToJsonDate(this.StartDate);
        request.EndDate = FsUtility.ToJsonDate(this.EndDate);
        request.Factor = this.Factor;
        request.Amount = this.Factor * this.PlotItem.Area;
        request.MinimumScore = this.MinimumScore;

        return request;
    }


}
