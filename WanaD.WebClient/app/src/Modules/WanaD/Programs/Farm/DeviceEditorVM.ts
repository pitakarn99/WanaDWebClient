/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */

import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import FarmAppService from "../../Scripts/AppServiceContract/FarmAppService";
import DeviceSearchVM from "./DeviceSearchVM";
import PlotDeviceData from "../../Scripts/AppServiceContract/PlotDeviceData";
import PlotSearchCriteria from "../../Scripts/AppServiceContract/PlotSearchCriteria";

export default class DeviceEditorVM extends EditorVMBase {
    Id: string;
    FarmId: string;
    PlotId: string;
    PlotName: string;
    DeviceNo: string;
    Api: string;
    DeviceId: string;
    SelectedPlot: any;


    constructor() {
        super();
        this.ValidationRules.on(this)
            .ensure('SelectedPlot').required().withMessage('Plot Name is required.')
            .ensure('DeviceId').required().withMessage('Sensor ID is required.')            
    }

    async LoadOriginalSourceAsync(originalSource: PlotDeviceData) {
        this.Id = originalSource.Id;
        this.PlotId = originalSource.PlotId;
        this.SelectedPlot = originalSource.PlotData;
        this.DeviceId = originalSource.DeviceId;
        this.DeviceNo = originalSource.SensorId;
        this.Api = originalSource.SensorCoordinate;
    }

    async SaveOriginalSourceAsync(originalSource: PlotDeviceData) {
        originalSource.Id = this.Id;
        originalSource.PlotId = this.PlotId;
        originalSource.PlotData = this.SelectedPlot;
        originalSource.DeviceId = this.DeviceId;
        originalSource.SensorId = this.DeviceNo;
        originalSource.SensorCoordinate = this.Api;
    }

    async SaveAsync(doneCallback: () => void, failCallback: (error) => void) {
        const self = this;
        //debugger
        const request = await this.CreateRequest();
        const service = this.container.get(FarmAppService) as FarmAppService;

        if (this.HasOriginalSource) {
            //debugger
            try {
                await service.PlotDeviceSaveAsync(request);
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
                const resultId = await service.PlotDeviceSaveAsync(request);
                this.Id = resultId;
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

    CreateRequest(): PlotDeviceData {
        const criteria = new PlotDeviceData();
        criteria.Id = this.Id;
        criteria.FarmId = this.FarmId;
        criteria.PlotId = this.SelectedPlot.id;
        criteria.DeviceId = this.DeviceId;
        return criteria;
    }

    async RemoveAsync(searchVM: DeviceSearchVM, removeCallback: () => Promise<void>) {
        const self = this;
        FsUtility.AlertModal("Are you sure you want to delete?", 3, 3, async (result) => {
            if (result) {
                const service = self.container.get(FarmAppService) as FarmAppService;
                try {
                    await service.PlotDeviceRemoveAsync(self.Id);
                    FsUtility.AlertModal("The item has been updated successfully", 2, 1);
                    if (removeCallback != null)
                        await removeCallback();
                } catch (error) {
                    FsUtility.CommonErrorHandler(error);
                }
            }
        });
    }

    
    async FindPlotNameAutoComplete(params, success, failure) {
        const self = this;
        const service = this.container.get(FarmAppService) as FarmAppService;
        const data = params.data.term == null ? "" : params.data.term;

        try {
            const SearchData = new PlotSearchCriteria;
            SearchData.FarmId = self.FarmId;
            SearchData.Name = data;

            const result = await service.FindPlotNameAsync(SearchData);
            success(result);
        }
        catch (error) {
            FsUtility.CommonErrorHandler(error);
            failure(error);
        }
    }


}
