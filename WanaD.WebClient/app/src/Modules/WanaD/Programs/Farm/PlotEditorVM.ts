/* eslint-disable @typescript-eslint/no-this-alias */

import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import PlotData from "../../Scripts/AppServiceContract/PlotData";
import FarmAppService from "../../Scripts/AppServiceContract/FarmAppService";
import PlotSearchVM from "./PlotSearchVM";

export default class PlotEditorVM extends EditorVMBase {
    Id: string;
    FarmId: string;
    Name: string;
    LandOwner: string;
    Latitude: number;
    Longitude: number;
    BankId: string;
    BankAccNumber: string;
    BankAccHolder: string;
    Area: number;


    constructor() {
        super();
        this.ValidationRules.on(this)
            .ensure('Name').required().withMessage('Plot Name is required.')
            .ensure('Area').required().withMessage('Area is required.')
            .ensure('LandOwner').required().withMessage('Land Owner Name is required.')
            .ensure('BankId').required().withMessage('Bank of Birth is required.')
            .ensure('BankAccNumber').required().withMessage('Bank Account Number is required.')
            .ensure('BankAccHolder').required().withMessage('Bank Account Holder is required.')
    }

    async LoadOriginalSourceAsync(originalSource: PlotData) {
        this.Id = originalSource.Id;
        this.FarmId = originalSource.FarmId;
        this.Name = originalSource.Name;
        this.LandOwner = originalSource.LandOwner;
        this.Latitude = originalSource.Latitude;
        this.Longitude = originalSource.Longitude;
        this.BankId = originalSource.BankId;
        this.BankAccNumber = originalSource.BankAccNumber;
        this.BankAccHolder = originalSource.BankAccHolder;
        this.Area = originalSource.Area;

    }

    async SaveOriginalSourceAsync(originalSource: PlotData) {
        originalSource.Id = this.Id;
        originalSource.FarmId = this.FarmId;
        originalSource.Name = this.Name == null ? null : this.Name.trim();
        originalSource.LandOwner = this.LandOwner == null ? null : this.LandOwner.trim();
        originalSource.Latitude = this.Latitude;
        originalSource.Longitude = this.Longitude;
        originalSource.BankId = this.BankId;
        originalSource.BankAccNumber = this.BankAccNumber;
        originalSource.BankAccHolder = this.BankAccHolder;
        originalSource.Area = this.Area;
    }

    async SaveAsync(doneCallback: () => void, failCallback: (error) => void) {
        const self = this;
        //debugger
        const request = await this.CreateRequest();
        const service = this.container.get(FarmAppService) as FarmAppService;

        if (this.HasOriginalSource) {
            //debugger
            try {
                await service.PlotSaveAsync(request);
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
            //debugger
            try {
                const resultPlotId = await service.PlotSaveAsync(request);
                this.Id = resultPlotId;
                FsUtility.AlertModal("The item has been insert successfully", 2, 1, async function (click) {
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
    }

    CreateRequest(): PlotData {
        const criteria = new PlotData();
        criteria.Id = this.Id;
        criteria.FarmId = this.FarmId;
        criteria.Name = this.Name == null ? null : this.Name.trim();
        criteria.LandOwner = this.LandOwner == null ? null : this.LandOwner.trim();
        //criteria.Latitude = this.Latitude;
        //criteria.Longitude = this.Longitude;
        criteria.BankId = this.BankId;
        criteria.BankAccNumber = this.BankAccNumber;
        criteria.BankAccHolder = this.BankAccHolder;
        criteria.Area = this.Area;
        return criteria;
    }


    async RemoveAsync(searchVM: PlotSearchVM, removeCallback: () => Promise<void>) {
        
        const self = this;
        FsUtility.AlertModal("Are you sure you want to delete?", 3, 3, async (result) => {
            if (result) {
                const service = self.container.get(FarmAppService) as FarmAppService;
                try {
                    await service.PlotRemoveAsync(self.Id);
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
