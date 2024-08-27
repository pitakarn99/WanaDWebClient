/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-inferrable-types */

import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import { IRouter } from "@aurelia/router";
import { IValidationController } from "@aurelia/validation-html";
import { IValidationRules } from "@aurelia/validation";
import { newInstanceForScope } from "@aurelia/kernel";
import UserData01 from "../../Scripts/AppServiceContract/UserData01";
import ManageUserAppService from "../../Scripts/AppServiceContract/ManageUserAppService";
import template from './UserDetailEditorView.html';
import { customElement, resolve } from 'aurelia';
import FarmAppService from "../../Scripts/AppServiceContract/FarmAppService";
import EthnicityData from "../../Scripts/AppServiceContract/EthnicityData";
import ReligionData from "../../Scripts/AppServiceContract/ReligionData";

@customElement({
    name: 'UserDetailEditorView',
    template
})
export default class UserDetailEditorVM extends EditorVMBase {
    Code: string;
    Name: string;
    Email: string;
    Login: string;
    IsActive: boolean = true;
    IsLocked: boolean;
    IsGroup: boolean;
    Password: string;
    PasswordExpireDate: Date;
    AuthType: any;
    IsCreate: boolean;
    IsEditMode: boolean;
    Id: string;
    ExternalUserId: string;
    router: IRouter = resolve(IRouter)
    IsRequirePassword: boolean = false;
    Provider: string;
    //


    IdCardNo: string;
    NameTH: string;
    SurnameTH: string;
    NameEn: string;
    SurnameEn: string;

    Address: string;
    DateofBirth: Date;
    ReligionId: string;
    EthnicityId: string;
    PhoneNo: string;
    Gender: number;
    IsThaiNational: boolean = false;
    ValidationController = resolve(
        IValidationController
    ) as IValidationController;
    ValidationRules = resolve(IValidationRules) as IValidationRules;
    constructor() {
        super();

        const self = this;
        this.FindEthnicity();
        this.FindReligion();


        self.IsActive = true;

        this.ValidationRules.on(this)
            .ensure('NameTH').required().withMessage('Name (TH) is required.')
            .ensure('SurnameTH').required().withMessage('Surname (TH) is required.')
            .ensure('NameEn').required().withMessage('Name (En) is required.')
            .ensure('SurnameEn').required().withMessage('Surname (En) is required.')
            .ensure('ReligionId').required().withMessage('Religion is required.')
            .ensure('EthnicityId').required().withMessage('Ethnicity is required.')
            .ensure('PhoneNo').required().withMessage('Phone No is required.')
            .ensure('Gender').required().withMessage('Gender is required.')
            .ensure('IsThaiNational').required().withMessage('IsThaiNational is required.')
            .ensure('Address').required().withMessage('Address is required.')
            .ensure('Password').required().when(t => !t.HasOriginalSource).withMessage('Password is required.')
            .ensure('IdCardNo').required().when(t => !t.IsThaiNational || t.IsThaiNational == null).withMessage('ID Number is required.')
            .ensure('DateofBirth').required().withMessage('Date of Birth is required.')
        this.IsCreate = true;
    }

    async load(params) {
        this.Id = params.id;
        await this.LoadAsync(params.id);
    }

    async LoadAsync(code: string) {
        const self = this;
        if (code != null && code != 'undefined') {
            self.Code = code;
            await self.LoadDataAsync();
            self.IsCreate = false;
            self.IsEditMode = true;
        } else {
            this.BeginEdit();
        }
    }

    Back(): void {
        this.router.load("Modules/WanaD/ManageUserPage");
    }

    async LoadOriginalSourceAsync(originalSource: UserData01) {
        this.Name = originalSource.Name;
        this.Email = originalSource.Email;
        this.Login = originalSource.Login;
        this.IsActive = originalSource.IsActive;
        this.IsLocked = originalSource.IsLocked;
        this.AuthType = originalSource.AuthType;
        this.Password = originalSource.Password;
        this.PasswordExpireDate = originalSource.PasswordExpireDate;
        this.IsGroup = originalSource.IsGroup;
        this.ExternalUserId = originalSource.ExternalUserId;
        this.HasOriginalSource = true;
        this.Provider = originalSource.Provider;
        this.Name = originalSource.Name;
        this.NameTH = originalSource.NameTH;
        this.SurnameTH = originalSource.SurnameTH;
        this.NameEn = originalSource.NameEn;
        this.SurnameEn = originalSource.SurnameEn;
        this.DateofBirth = FsUtility.CreateDateObject(FsUtility.ParseDate(originalSource.DateofBirth, 1));
        this.ReligionId = originalSource.ReligionId;
        this.EthnicityId = originalSource.EthnicityId;
        this.PhoneNo = originalSource.PhoneNo;
        this.IdCardNo = originalSource.IdCardNo;
        this.Gender = originalSource.Gender;
        this.IsThaiNational = originalSource.IsThaiNational;
        this.Address = originalSource.Address;
    }

    async SaveOriginalSourceAsync(originalSource: UserData01) {
        originalSource.Name = $.trim(this.Name);
        originalSource.Email = $.trim(this.Email);
        originalSource.Login = $.trim(this.Login);
        originalSource.ExternalUserId = $.trim(this.ExternalUserId);
        originalSource.IsActive = this.IsActive;
        originalSource.IsLocked = this.IsLocked;
        originalSource.AuthType = this.IsGroup;
        originalSource.Password = this.Password;
        originalSource.PasswordExpireDate = this.PasswordExpireDate;
        originalSource.Provider = this.Provider;
        originalSource.Name = this.Name;
        originalSource.NameTH = this.NameTH;
        originalSource.SurnameTH = this.SurnameTH;
        originalSource.NameEn = this.NameEn;
        originalSource.SurnameEn = this.SurnameEn;

        originalSource.DateofBirth = this.DateofBirth;
        originalSource.ReligionId = this.ReligionId;
        originalSource.EthnicityId = this.EthnicityId;
        originalSource.PhoneNo = this.PhoneNo;
        originalSource.IdCardNo = this.IdCardNo;
        originalSource.Gender = this.Gender;
        originalSource.IsThaiNational = this.IsThaiNational;
        originalSource.Address = this.Address;
    }

    async SaveData() {

        const self = this;

        await self.ValidationController.validate({ object: self }).then(async result => {

            if (result.valid) {
                await this.SaveAsync(null, null);
            }
        });

    }

    async SaveAsync(doneCallback: () => void, failCallback: (error) => void) {
        const self = this;

        const request = await this.CreateRequestAsync();

        const service = this.container.get(ManageUserAppService) as ManageUserAppService;
        if (this.HasOriginalSource) {
            try {
                await service.UpdateAsync(request);
                FsUtility.AlertModal("The item has been updated successfully", 2, 1, async function (click) {
                    if (click == true) {
                        if (doneCallback != null) {
                            doneCallback();
                        }

                        await self.EndEditAsync();

                    }
                });

            } catch (error) {
                FsUtility.CommonErrorHandler(error);
            }
        } else {
            request.IsGroup = false;
            request.AuthType = 0;
            try {
                const result = await service.AddAsync(request);
                if (self.IsCreate) {
                    FsUtility.AlertModal("The item has been saved successfully", 2, 1, async function (click) {
                        if (click == true) {


                            await self.EndEditAsync();
                            self.router.load("Modules/WanaD/UserDetailPage/" + result);
                        }
                    });
                }
            } catch (error) {
                FsUtility.CommonErrorHandler(error);
            }
        }
    }

    async LoadDataAsync() {
        const self = this;
        const service = this.container.get(ManageUserAppService) as ManageUserAppService;
        try {
            const result = await service.LoadAsync(self.Id);
            await self.SetOriginalSourceAsync(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    CreateRequestAsync(): UserData01 {

        const request = new UserData01();
        request.Name = $.trim(this.NameEn) + " " + $.trim(this.SurnameEn);
        request.Email = $.trim(this.Email);
        request.Login = $.trim(this.PhoneNo);
        request.ExternalUserId = $.trim(this.ExternalUserId);
        request.IsActive = this.IsActive;
        request.IsLocked = this.IsLocked;
        request.AuthType = this.IsGroup;
        request.Password = $.trim(this.Password);
        request.PasswordExpireDate = this.PasswordExpireDate;
        request.Provider = $.trim(this.Provider);
        request.UserUID = this.Code
        request.NameTH = $.trim(this.NameTH);
        request.SurnameTH = $.trim(this.SurnameTH);
        request.NameEn = $.trim(this.NameEn);
        request.SurnameEn = $.trim(this.SurnameEn);

        request.DateofBirth = FsUtility.ToJsonDate(this.DateofBirth);
        request.ReligionId = this.ReligionId;
        request.EthnicityId = this.EthnicityId;
        request.PhoneNo = $.trim(this.PhoneNo);
        request.IdCardNo = $.trim(this.IdCardNo);
        request.Gender = this.Gender;
        request.IsThaiNational = this.IsThaiNational;
        request.Address = $.trim(this.Address);
        return request;

    }

    async CancelAsync() {
        const self = this;
        if (self.IsCreate)
            self.router.load("Modules/WanaD/ManageUserPage");
        else {
            await this.SetIsEditing(false);
            if (self.HasOriginalSource)
                await this.LoadOriginalSourceAsync(self.OriginalSource);
        }
    }
    EthnicityDatas: any;
    async FindEthnicity() {

        const service = this.container.get(FarmAppService) as FarmAppService;
        try {
            const result = await service.FindEthnicityAsync() as EthnicityData[];
            this.EthnicityDatas = result;
        }
        catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    ReligionDatas: any;
    async FindReligion() {

        const service = this.container.get(FarmAppService) as FarmAppService;
        try {
            const result = await service.FindReligionAsync() as ReligionData[];
            this.ReligionDatas = result;
        }
        catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }
    async GeneratePassword() {
        const length = 4;
        const charset = "0123456789";
        let retVal = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += await charset.charAt(Math.floor(Math.random() * n));
        }
        this.Password = retVal;
    }
}
