/* eslint-disable @typescript-eslint/no-this-alias */

import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import FarmData from "../../Scripts/AppServiceContract/FarmData";
import FarmAppService from "../../Scripts/AppServiceContract/FarmAppService";
import FarmSearchVM from "./FarmSearchVM";

export default class FarmEditorVM extends EditorVMBase {
    Id: string;
    Name: string;
    OwnerName: string;
    Latitude: number;
    Longitude: number;
    Address: string;
    DateOfBirth: Date;
    ReligionId: string;
    EthnicityId: string;
    PhoneNumber: string;
    IDNumber: string;
    Code: string;
    Gender: number;
    IsThaiNationality: boolean;


    constructor() {
        super();
        this.ValidationRules.on(this);
    }

    async LoadOriginalSourceAsync(originalSource: FarmData) {
        this.Id = originalSource.Id;
        this.Name = originalSource.Name;
        this.OwnerName = originalSource.OwnerName;
        this.Latitude = originalSource.Latitude;
        this.Longitude = originalSource.Longitude;
        this.Address = originalSource.Address;
        this.DateOfBirth = originalSource.DateOfBirth;
        this.ReligionId = originalSource.ReligionId;
        this.EthnicityId = originalSource.EthnicityId;
        this.PhoneNumber = originalSource.PhoneNumber;
        this.IDNumber = originalSource.IDNumber;
        this.Gender = originalSource.Gender;
        this.IsThaiNationality = originalSource.IsThaiNationality;
        this.Code = originalSource.Code;
    }

    async SaveOriginalSourceAsync(originalSource: FarmData) {
        originalSource.Id = this.Id;
        originalSource.Name = this.Name == null ? null : this.Name.trim();
        originalSource.OwnerName = this.OwnerName == null ? null : this.OwnerName.trim();
        originalSource.Latitude = this.Latitude;
        originalSource.Longitude = this.Longitude;
        originalSource.Address = this.Address;
        originalSource.DateOfBirth = this.DateOfBirth;
        originalSource.ReligionId = this.ReligionId;
        originalSource.EthnicityId = this.EthnicityId;
        originalSource.PhoneNumber = this.PhoneNumber;
        originalSource.IDNumber = this.IDNumber;
        originalSource.Gender = this.Gender;
        originalSource.IsThaiNationality = this.IsThaiNationality;
        originalSource.Code = this.Code;
    }

    async RemoveAsync(searchVM: FarmSearchVM, removeCallback: () => Promise<void>) {        
        const self = this;
        FsUtility.AlertModal("Are you sure you want to delete?", 3, 3, async (result) => {
            if (result) {
                const service = self.container.get(FarmAppService) as FarmAppService;
                try {
                    await service.FarmRemoveAsync(self.Id);
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
