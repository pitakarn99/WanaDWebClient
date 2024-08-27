/* eslint-disable no-var */
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";

import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import ConfigurationSearchVM from "./ConfigurationSearchVM";
import ConfigurationData from "../../Scripts/AppServiceContract/ConfigurationData";
import ConfigurationRequest from "../../Scripts/AppServiceContract/ConfigurationRequest";
import ConfigurationAppService from "../../Scripts/AppServiceContract/ConfigurationAppService";


export default class ConfigurationEditorVM extends EditorVMBase {
    public ConfigurationItemCode: string;
    public ConfigurationItemValue: string;
    public ConfigurationItemName: string;
    public searchVM: ConfigurationSearchVM;
    constructor() {
        super();

        this.ValidationRules.on(this)
            .ensure("ConfigurationItemCode")
            .required()
            .withMessage("Code is required.")
            .ensure("ConfigurationItemValue")
            .required()
            .withMessage("Value is required.");
    }

    async LoadOriginalSourceAsync(originallSource: ConfigurationData) {
        this.ConfigurationItemCode = originallSource.ConfigurationItemCode;
        this.ConfigurationItemValue = originallSource.ConfigurationItemValue;
        this.ConfigurationItemName = originallSource.ConfigurationItemName;

    }

    async SaveOriginalSourceAsync(originallSource: ConfigurationData) {
        originallSource.ConfigurationItemCode = this.ConfigurationItemCode;
        originallSource.ConfigurationItemValue = this.ConfigurationItemValue;
        originallSource.ConfigurationItemName = this.ConfigurationItemName;
    }

    CreateRequest(): ConfigurationRequest {
        var request = new ConfigurationRequest();
        request.ConfigurationItemValue = this.ConfigurationItemValue;
        request.ConfigurationItemCode = this.ConfigurationItemCode;
        request.ConfigurationItemName = this.ConfigurationItemName;
        return request;
    }

    async SaveAsync(doneCallback: () => void, failCallback: (error: any) => void) {
        var request = this.CreateRequest();
        var service = (this.container.get(ConfigurationAppService) as ConfigurationAppService);
        if (this.HasOriginalSource) {
            try {
                await service.UpdateAsync(request);
                FsUtility.AlertModal("The item has been edit successfully", 2, 1);
                doneCallback();
            } catch (error) {
                FsUtility.CommonErrorHandler(error);
            }
        }
    }

}
