/* eslint-disable @typescript-eslint/no-this-alias */

import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import GenerateCodeDetailSearchVM from "./GenerateCodeDetailSearchVM";


import { IRouter } from "@aurelia/router";

import QRData from "../../Scripts/AppServiceContract/QRData";

export default class GenerateCodeDetailEditorVM extends EditorVMBase {
    Id: string;
    QrEntityId: string;
    ProductId: string;
    RunningNo: string;
    ProductName: string;
    Date:Date


    constructor() {
        super();
        this.ValidationRules.on(this);
    }

    async LoadOriginalSourceAsync(originalSource: QRData) {
        this.Id = originalSource.Id;
        this.QrEntityId = originalSource.QrEntityId;
        this.ProductId = originalSource.ProductId;
        this.RunningNo = originalSource.RunningNo;
        this.ProductName = originalSource.ProductName;
        this.Date = originalSource.Date;
    }
    async SaveOriginalSourceAsync(originalSource: QRData) {
        originalSource.Id = $.trim(this.Id);
        originalSource.QrEntityId = $.trim(this.QrEntityId);
        originalSource.ProductId = $.trim(this.ProductId);
        originalSource.RunningNo = $.trim(this.RunningNo);
        originalSource.ProductName = $.trim(this.ProductName);
        originalSource.Date = this.Date
    }
   
  
}
