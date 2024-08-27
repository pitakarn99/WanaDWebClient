/* eslint-disable @typescript-eslint/no-this-alias */

import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import FactoryAppService from "../../Scripts/AppServiceContract/FactoryAppService";
import FsUtility from "../../../../Lib/Fs.SmartClient.Client/FsUtility";
import PlotSearchCriteria from "../../Scripts/AppServiceContract/PlotSearchCriteria";
import FactoryMemberData from "../../Scripts/AppServiceContract/FactoryMemberData";
import FactoryMemberSearchCriteria from "../../Scripts/AppServiceContract/FactoryMemberSearchCriteria";
import FactoryMemberSearchVM from "./FactoryMemberSearchVM";

export default class FactoryMemberEditorVM extends EditorVMBase {
    Id: string;
    FactoryId: string;
    ListFactoryMember: any[];
    UserId: string;
    ListRole: [];
    Name: string;
    Surname: string;
    IsCreate: boolean;
    FactoryMemberDataObj: any;
    PhoneNo: string;


    constructor() {
        super();
        this.ValidationRules.on(this)
            .ensure('FactoryMemberDataObj').required().when(t => t.IsCreate).withMessage('Name is required.')
            .ensure('ListRole').minItems(1).withMessage('Role is required.')
    }

    async LoadOriginalSourceAsync(originalSource: FactoryMemberData) {
        this.Id = originalSource.Id;
        this.FactoryId = originalSource.FactoryId;
        this.UserId = originalSource.UserId;
        this.ListRole = originalSource.ListRole;
        this.Name = originalSource.Name;
        this.Surname = originalSource.Surname;
        this.PhoneNo = originalSource.PhoneNo;
        this.FactoryMemberDataObj = originalSource.FactoryMemberDataObj;
        this.HasOriginalSource = true;
    }

    async SaveOriginalSourceAsync(originalSource: FactoryMemberData) {
        originalSource.Id = this.Id;
        originalSource.FactoryId = this.FactoryId;
        originalSource.UserId = this.UserId;
        originalSource.ListRole = this.ListRole;
        originalSource.Name = this.Name;
        originalSource.Surname = this.Surname;
        originalSource.PhoneNo = this.PhoneNo;
        originalSource.FactoryMemberDataObj = this.FactoryMemberDataObj;
    }

    CreateRequest(): FactoryMemberData {
        const criteria = new FactoryMemberData();
        criteria.UserId = this.FactoryMemberDataObj.UserId;
        criteria.FactoryId = this.FactoryId;
        criteria.ListRole = this.ListRole;
        //debugger
        return criteria;
    }

    async SaveAsync(doneCallback: () => void, failCallback: (error) => void) {
        
        const self = this;
        const request = await this.CreateRequest();
        const service = this.container.get(FactoryAppService) as FactoryAppService;

        if (this.HasOriginalSource) {
            
            try {
                await service.UpdateFactoryMemberAsync(request);
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
                const resultId = await service.AddFactoryMemberAsync(request);
                this.FactoryId = resultId;
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

    async RemoveAsync(searchVM: FactoryMemberSearchVM, removeCallback: () => Promise<void>) {
        const self = this;
        const request = await this.CreateRequest();
        FsUtility.AlertModal("Are you sure you want to delete?", 3, 3, async (result) => {
            if (result) {
                const service = self.container.get(FactoryAppService) as FactoryAppService;
                try {
                    await service.RemoveFactoryMemberAsync(request);
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
        const service = this.container.get(FactoryAppService) as FactoryAppService;
        const data = params.data.term == null ? "" : params.data.term;

        try {
            const SearchData = new FactoryMemberSearchCriteria;
            SearchData.FactoryId = self.FactoryId;
            SearchData.Name = data;

            const result = await service.FindFactoryMemberAutoCompleteAsync(SearchData);
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
