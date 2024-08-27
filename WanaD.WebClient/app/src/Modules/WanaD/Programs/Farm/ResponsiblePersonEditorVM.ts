/* eslint-disable @typescript-eslint/no-this-alias */

import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import ResponsiblePersonData from "../../Scripts/AppServiceContract/ResponsiblePersonData";
import FarmAppService from "../../Scripts/AppServiceContract/FarmAppService";
import FsUtility from "../../../../Lib/Fs.SmartClient.Client/FsUtility";
import ResponsiblePersonSearchCriteria from "../../Scripts/AppServiceContract/ResponsiblePersonSearchCriteria";
import ResponsiblePersonSearchVM from "./ResponsiblePersonSearchVM";
import PlotSearchCriteria from "../../Scripts/AppServiceContract/PlotSearchCriteria";

export default class ResponsiblePersonEditorVM extends EditorVMBase {
    Id: string;
    FarmId: string;
    ListPlotId: string[];
    ListResponsiblePerson: any[];
    UserId: string;
    ListRole: [];
    Name: string;
    Surname: string;
    selectedPlots = [];
    IsCreate: boolean;
    ResponsiblePersonDataObj: any;
   


    constructor() {
        super();
        this.ValidationRules.on(this)
            .ensure('ResponsiblePersonDataObj').required().when(t => t.IsCreate).withMessage('Name is required.')
            .ensure('ListRole').minItems(1).withMessage('Role is required.')
            .ensure('selectedPlots').minItems(1).when(t => t.ListRole.some(t => t == "PlotManager")).withMessage('Plot Name is required.')
    }

    async LoadOriginalSourceAsync(originalSource: ResponsiblePersonData) {        
        this.Id = originalSource.Id;
        this.FarmId = originalSource.FarmId;
        this.ListPlotId = originalSource.ListPlotId;
        this.UserId = originalSource.UserId;
        this.ListRole = originalSource.ListRole;//clone
        this.Name = originalSource.Name;
        this.Surname = originalSource.Surname;
        this.ResponsiblePersonDataObj = originalSource.ResponsiblePersonDataObj;
    }

    async SaveOriginalSourceAsync(originalSource: ResponsiblePersonData) {
        originalSource.Id = this.Id;
        originalSource.FarmId = this.FarmId;
        originalSource.ListPlotId = this.ListPlotId;
        originalSource.UserId = this.UserId;
        originalSource.ListRole = this.ListRole;//clone
        originalSource.Name = this.Name;
        originalSource.Surname = this.Surname;
        originalSource.ResponsiblePersonDataObj = this.ResponsiblePersonDataObj;
    }

    CreateRequest(): ResponsiblePersonData {
        const criteria = new ResponsiblePersonData();
        criteria.UserId = this.ResponsiblePersonDataObj.UserId;
        criteria.FarmId = this.FarmId;
        criteria.ListPlotId = this.selectedPlots.map(t => t.id);
        this.ListPlotId = this.selectedPlots.map(t => t.id);
        criteria.ListRole = this.ListRole;
        return criteria;
    }

    async SaveAsync(doneCallback: () => void, failCallback: (error) => void) {
        const self = this;
        const request = await this.CreateRequest();
        const service = this.container.get(FarmAppService) as FarmAppService;

        if (this.HasOriginalSource) {
            
            try {
                await service.UpdateResponsiblePersonAsync(request);
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
                const resultId = await service.AddResponsiblePersonAsync(request);
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

    async RemoveAsync(searchVM: ResponsiblePersonSearchVM, removeCallback: () => Promise<void>) {
        const self = this;
        const request = await this.CreateRequest();
        FsUtility.AlertModal("Are you sure you want to delete?", 3, 3, async (result) => {
            if (result) {
                const service = self.container.get(FarmAppService) as FarmAppService;
                try {
                    await service.RemoveResponsiblePersonAsync(request);
                    FsUtility.AlertModal("The item has been updated successfully", 2, 1);
                    if (removeCallback != null)
                        await removeCallback();
                }
                catch (error) {
                    FsUtility.CommonErrorHandler(error);
                }
            }
        })
    }

    async FindUserAutoComplete(params, success, failure) {
        const self = this;
        const service = this.container.get(FarmAppService) as FarmAppService;
        const data = params.data.term == null ? "" : params.data.term;

        try {
            const SearchData = new ResponsiblePersonSearchCriteria;
            SearchData.FarmId = self.FarmId;
            SearchData.Name = data;

            const result = await service.FindResponsiblePersonAutoCompleteAsync(SearchData);
            success(result);
        }
        catch (error) {
            FsUtility.CommonErrorHandler(error);
            failure(error);
        }
    }

    PlotNameDatas: any;
    async FindPlotAutoCompleteAsync(params, success, failure) {
        const self = this;
        const service = this.container.get(FarmAppService) as FarmAppService;
        const data = params.data.term == null ? "" : params.data.term;
        try {
            const SearchData = new PlotSearchCriteria;
            SearchData.FarmId = self.FarmId;
            SearchData.Name = data;

            const result = await service.FindPlotAutoCompleteAsync(SearchData);
            this.PlotNameDatas = result;
            success(result);
        }
        catch (error) {
            FsUtility.CommonErrorHandler(error);
            failure(error);
        }
    }

    calculateitemtext(item) {
        return item == null ? "" : item.item.Name + " " + item.item.Surname;
    }

}
