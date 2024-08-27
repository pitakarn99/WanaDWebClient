/* eslint-disable @typescript-eslint/no-this-alias */

import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import ManageUserSearchVM from "./ManageUserSearchVM";

//import ManageUserAppService from "../../Scripts/AppServiceContract/ManageUserAppService";
import { IRouter } from "@aurelia/router";
import ManageUserAppService from "../../Scripts/AppServiceContract/ManageUserAppService";
import UserData01 from "../../Scripts/AppServiceContract/UserData01";

export default class ManageUserEditorVM extends EditorVMBase {
    Id: string;
    Name: string;
    IsActive: boolean;
    IsLocked: boolean;
    router: IRouter;
    Email: string;

    EthnicityId: string;
    ReligionId: string;
    IdCardNo: string;
    NameTH: string;
    SurnameTH: string;
    NameEn: string;
    SurnameEn: string;
    DateofBirth: Date;
    Gender: number;
    PhoneNo: string;
    Address: string;
    IsThaiNational: boolean;
    constructor() {
        super();
        this.ValidationRules.on(this);
    }

    async LoadOriginalSourceAsync(originalSource: UserData01) {
        this.Id = originalSource.UserUID;
        this.Name = originalSource.Name;
        this.Email = originalSource.Email;
        this.IsActive = originalSource.IsActive;
        this.IsLocked = originalSource.IsLocked;

        this.EthnicityId = originalSource.EthnicityId;
        this.ReligionId = originalSource.ReligionId;
        this.IdCardNo = originalSource.IdCardNo;
        this.NameTH = originalSource.NameTH;
        this.SurnameTH = originalSource.SurnameTH;
        this.NameEn = originalSource.NameEn;
        this.SurnameEn = originalSource.SurnameEn;
        this.DateofBirth = originalSource.DateofBirth;
        this.Gender = originalSource.Gender;
        this.PhoneNo = originalSource.PhoneNo;
        this.Address = originalSource.Address;
        this.IsThaiNational = originalSource.IsThaiNational;
    }
    async SaveOriginalSourceAsync(originalSource: UserData01) {
        originalSource.UserUID = $.trim(this.Id);
        originalSource.Name = $.trim(this.Name);
        originalSource.Email = $.trim(this.Email);
        originalSource.IsActive = this.IsActive;
        originalSource.IsLocked = this.IsLocked;
        originalSource.EthnicityId = this.EthnicityId;
        originalSource.ReligionId = this.ReligionId;
        originalSource.IdCardNo = this.IdCardNo;
        originalSource.NameTH = this.NameTH;
        originalSource.SurnameTH = this.SurnameTH;
        originalSource.NameEn = this.NameEn;
        originalSource.SurnameEn = this.SurnameEn;
        originalSource.DateofBirth = this.DateofBirth;
        originalSource.Gender = this.Gender;
        originalSource.PhoneNo = this.PhoneNo;
        originalSource.Address = this.Address;
        originalSource.IsThaiNational = this.IsThaiNational;
    }
    async RemoveAsync(searchVM: ManageUserSearchVM, removeCallback: () => Promise<void>) {
        const self = this;
        FsUtility.AlertModal("Are you sure you want to delete?", 3, 3, async (result) => {
            if (result) {
                const service = self.container.get(ManageUserAppService) as ManageUserAppService;
                try {
                    await service.RemoveAsync(self.Id);
                    FsUtility.AlertModal("The item has been updated successfully", 2, 1);
                    if (removeCallback != null)
                        await removeCallback();
                } catch (error) {
                    FsUtility.CommonErrorHandler(error);
                }
            }

        })
    }
    EditUserUrl(editorVM: ManageUserEditorVM) {
        this.router.load("Modules/WanaD/UserDetailPage/" + editorVM.Id);
    }
    
}
