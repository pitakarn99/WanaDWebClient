/* eslint-disable @typescript-eslint/no-this-alias */

import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import GenerateCodeSearchVM from "./GenerateCodeSearchVM";


import { IRouter } from "@aurelia/router";

import GenerateCodeData from "../../Scripts/AppServiceContract/GenerateCodeData";
import GenerateCodeSearchCriteria from "../../Scripts/AppServiceContract/GenerateCodeSearchCriteria";
import GenerateCodeAppService from "../../Scripts/AppServiceContract/GenerateCodeAppService";
import { transient, resolve } from "aurelia";
import GenerateCodeRequest from "../../Scripts/AppServiceContract/GenerateCodeRequest";


export default class GenerateCodeEditorVM extends EditorVMBase {
    Id: string;
    Group: string;
    NameEN: string;
    NameTH: string;
    Address: string;
    PhoneNo: string;
    Total: number;
    Remain: number;
    LatestGenerateDate: Date;

    GroupRequest: string;
    RegIdRequest: string;
    QuantityRequest: number;
    router = resolve(IRouter)

    constructor() {
        super();
        this.ValidationRules.on(this)
            .ensure('GroupRequest').required().withMessage('Group is required.')
            .ensure('RegIdRequest').required().withMessage('Name is required.')
            .ensure('QuantityRequest').required().withMessage('Quantity is required.')

        this.ChangeOptionsSingle();
    }

    async LoadOriginalSourceAsync(originalSource: GenerateCodeData) {
        this.Id = originalSource.Id;
        this.Group = originalSource.Group;
        this.NameEN = originalSource.NameEN;
        this.NameTH = originalSource.NameTH;
        this.Address = originalSource.Address;
        this.PhoneNo = originalSource.PhoneNo;
        this.Total = originalSource.Total;
        this.Remain = originalSource.Remain;
        this.LatestGenerateDate = originalSource.LatestGenerateDate;
    }
    async SaveOriginalSourceAsync(originalSource: GenerateCodeData) {
        originalSource.Id = $.trim(this.Id);
        originalSource.Group = $.trim(this.Group);
        originalSource.NameEN = $.trim(this.NameEN);
        originalSource.NameTH = this.NameTH;
        originalSource.Address = this.Address;
        originalSource.PhoneNo = this.PhoneNo;
        originalSource.Total = this.Total;
        originalSource.Remain = this.Remain;
        originalSource.LatestGenerateDate = this.LatestGenerateDate;
    }
    OptionsSingle
    ChangeOptionsSingle() {
        const options = [];
        options.push({ Id: "", Code: "", Name: "Farm / Factory" });
        options.push({ Id: "Farm", Code: "Farm", Name: "Farm" });
        options.push({ Id: "Factory", Code: "Factory", Name: "Factory" });
        this.OptionsSingle = options;
    }
    FindBrands(obj) {
        const self = this;
        const params = obj.params,
            success = obj.success,
            failure = obj.failure;
        if (params == undefined && success == undefined && failure == undefined) {
            return;
        }
        const service = this.container.get(
            GenerateCodeAppService
        ) as GenerateCodeAppService;

        if (params?.data?.term != null) {

            const x = new GenerateCodeSearchCriteria();
            x.Group = self.GroupRequest;
            x.Name = params.data.term

            service
                .FindBrandAsync(x)
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

        const service = this.container.get(GenerateCodeAppService) as GenerateCodeAppService;
        const request = new GenerateCodeRequest();
        const self = this;
        request.Quantity = this.QuantityRequest;
        request.RefId = this.RegIdRequest;
        request.Group = this.GroupRequest;
        try {
            const x = await service.AddAsync(request);
            FsUtility.AlertModal("The item has been saved successfully", 2, 1, async function (click) {
                if (doneCallback != null) {
                    doneCallback();
                }
                await self.EndEditAsync();
                self.router.load("Modules/WanaD/ManageGenerateCodeDetailPage/" + x);

            });

        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }


}
