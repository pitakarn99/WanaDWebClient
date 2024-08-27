/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */

import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import { IRouter } from "@aurelia/router";
import FactoryData from "../../Scripts/AppServiceContract/FactoryData";
import FactoryAppService from "../../Scripts/AppServiceContract/FactoryAppService";
import BankData from "../../Scripts/AppServiceContract/BankData";
import { IValidationController } from "@aurelia/validation-html";
import { DialogService, IDialogService } from "@aurelia/dialog";
import { newInstanceForScope } from "@aurelia/kernel";
import template from './FactoryDetailView.html';
import { customElement, resolve } from 'aurelia';
import FactoryMemberSearchVM from "./FactoryMemberSearchVM";
import { transient } from 'aurelia';

@transient

@customElement({
    name: 'FactoryDetailView',
    template
})

export default class FactoryDetailEditorVM extends EditorVMBase {
    Id: string;
    NameTH: string;
    NameEN: string;
    BankId: string;
    BankAccountNo: string;
    BankAccountHolder: string;
    Address: string;
    Code: string;
    IsActive: boolean;
    FactoryId: string;
    dialogService: any;
    IsCreate: boolean;
    FactoryMemberSearchVM: FactoryMemberSearchVM;
    router: IRouter = resolve(IRouter)
    ValidationController = resolve(
        newInstanceForScope(IValidationController)
    ) as IValidationController;
    static inject = [IDialogService];
    constructor(   dialogService) {
        super();
      
        this.dialogService = dialogService;
        this.ValidationRules.on(this)
            .ensure('NameEN').required().withMessage('NameEN is required.')
            .ensure('NameTH').required().withMessage('NameTH is required.')
            .ensure('Address').required().withMessage('Address is required.')
            .ensure('BankId').required().withMessage('Bank is required.')
            .ensure('BankAccountNo').required().withMessage('Bank Account Number is required.')
            .ensure('BankAccountHolder').required().withMessage('Bank Account Holder is required.');

        this.IsCreate = true;
        this.FindBank();
    }

    async loading(params) {
        if (params.id != null) {
            await this.SearchFactory(params.id);
            this.IsCreate = false;
        }
        else {
            this.BeginEdit();
        }
    }

    async PrepareChildVMsAsync() {
        super.PrepareChildVMsAsync();
        this.FactoryMemberSearchVM = this.container.get(FactoryMemberSearchVM);
        this.FactoryMemberSearchVM.Load(this.FactoryId);
        this.AddChildNode(this.FactoryMemberSearchVM);
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
        this.FactoryId = originalSource.Id;
        this.HasOriginalSource = true;
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

    async SearchFactory(id: string) {
        const self = this;
        const service = this.container.get(FactoryAppService) as FactoryAppService;

        try {
            const result = await service.FindByIdAsync(id) as FactoryData;
            await self.SetOriginalSourceAsync(result);

            this.PrepareChildVMsAsync();
        }
        catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    SelectedReligion: string;
    SelectedEthnicity: string;
    CreateRequest(): FactoryData {
        const criteria = new FactoryData();
        criteria.Id = this.FactoryId;
        criteria.NameTH = this.NameTH;
        criteria.NameEN = this.NameEN;
        criteria.Address = this.Address;
        criteria.BankId = this.BankId;
        criteria.BankAccountNo = this.BankAccountNo;
        criteria.BankAccountHolder = this.BankAccountHolder;
        criteria.Code = this.Code;
        criteria.IsActive = this.IsActive;
        return criteria;
    }


    SaveData() {
        const self = this;

        self.ValidationController.validate({ object: self }).then(async result => {
            if (result.valid) {
                await this.SaveAsync(null, null);
            }
        });

    }

    async SaveAsync(doneCallback: () => void, failCallback: (error) => void) {
        const self = this;

        const request = await this.CreateRequest();
        const service = this.container.get(FactoryAppService) as FactoryAppService;
        if (this.HasOriginalSource) {
            try {
                const resultId = await service.FactorySaveAsync(request);
                const result = await service.FindByIdAsync(resultId) as FactoryData;

                this.Id = result.Id;
                this.NameEN = result.NameEN;
                this.NameTH = result.NameTH;
                this.Address = result.Address;
                this.BankId = result.BankId;
                this.BankAccountNo = result.BankAccountNo;
                this.BankAccountHolder = result.BankAccountHolder;
                this.Code = result.Code;
                this.IsActive = result.IsActive;
                this.PrepareChildVMsAsync();
                FsUtility.AlertModal("The item has been updated successfully", 2, 1, async function (click) {
                    if (click == true) {
                        if (doneCallback != null) {
                            doneCallback();
                        }
                        await self.EndEditAsync();
                    }
                });
            }
            catch (error) {
                FsUtility.CommonErrorHandler(error);
            }
        }
        else {
            try {
                const resultId = await service.FactorySaveAsync(request);
                this.FactoryId = resultId;
                FsUtility.AlertModal("The item has been saved successfully", 2, 1, async function (click) {
                    if (click == true) {
                        if (doneCallback != null) {
                            doneCallback();
                        }
                        await self.EndEditAsync();

                        self.router.load("Modules/WanaD/FactoryDetailPage/" + resultId);
                    }
                });
            }
            catch (error) {
                FsUtility.CommonErrorHandler(error);
            }
        }
    }

    BankDatas: any;
    async FindBank() {
        const service = this.container.get(FactoryAppService) as FactoryAppService;
        try {
            const result = await service.FindBankAsync() as BankData[];
            this.BankDatas = result;
        }
        catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    BackPage() {
        const self = this;
        self.router.load("Modules/WanaD/ManageFactoryPage");
    }

    async CancelAsync() {
        const self = this;
        if (self.IsCreate)
            self.router.load("Modules/WanaD/ManageFactoryPage");
        else {
            await this.SetIsEditing(false);
            if (self.HasOriginalSource) {
                await this.LoadOriginalSourceAsync(self.OriginalSource);
            }
        }
    }

}
