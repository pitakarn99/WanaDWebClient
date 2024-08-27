/* eslint-disable @typescript-eslint/no-this-alias */

import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import { IRouter } from "@aurelia/router";
import FactoryData from "../../Scripts/AppServiceContract/FactoryData";
import FactoryAppService from "../../Scripts/AppServiceContract/FactoryAppService";
import FactorySearchVM from "./FactorySearchVM";

export default class FactoryEditorVM extends EditorVMBase {
    Id: string;
    NameTH: string;
    NameEN: string;
    BankId: string;
    BankAccountNo: string;
    BankAccountHolder: string;
    Address: string;
    Code: string;
    IsActive: boolean;


    constructor() {
        super();
        this.ValidationRules.on(this);
    }

    async LoadOriginalSourceAsync(originalSource: FactoryData) {
        this.Id = originalSource.Id;
        this.NameTH = originalSource.NameTH;
        this.NameEN = originalSource.NameEN;
        this.Address = originalSource.Address;
        this.BankId = originalSource.BankId;
        this.BankAccountNo = originalSource.BankAccountNo;
        this.BankAccountHolder = originalSource.BankAccountHolder;
        this.Code = originalSource.Code;
        this.IsActive = originalSource.IsActive;
    }

    async SaveOriginalSourceAsync(originalSource: FactoryData) {
        originalSource.Id = this.Id;
        originalSource.NameTH = this.NameTH == null ? null : this.NameTH.trim();
        originalSource.NameEN = this.NameEN == null ? null : this.NameEN.trim();
        originalSource.Address = this.Address;
        originalSource.BankId = this.BankId;
        originalSource.BankAccountNo = this.BankAccountNo;
        originalSource.BankAccountHolder = this.BankAccountHolder;
        originalSource.IsActive = this.IsActive;
    }

    async RemoveAsync(searchVM: FactorySearchVM, removeCallback: () => Promise<void>) {
        
        const self = this;
        FsUtility.AlertModal("Are you sure you want to delete?", 3, 3, async (result) => {
            if (result) {
                const service = self.container.get(FactoryAppService) as FactoryAppService;
                try {
                    await service.FactoryRemoveAsync(self.Id);
                    FsUtility.AlertModal("The item has been updated successfully", 2, 1);
                    if (removeCallback != null)
                        await removeCallback();
                } catch (error) {
                    FsUtility.CommonErrorHandler(error);
                }
            }

        })
    }


}
