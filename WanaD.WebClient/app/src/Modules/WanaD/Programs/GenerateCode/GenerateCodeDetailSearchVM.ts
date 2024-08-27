/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-async-promise-executor */

import SearchVMBase2 from "Lib/Fs.SmartClient.Client/SearchVMBase2";
import PagingCriteria from "Lib/Fs.Core.Data/PagingCriteria";
import SortingCriteria from "Lib/Fs.Core.Data/SortingCriteria";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import GenerateCodeDetailEditorVM from "./GenerateCodeDetailEditorVM";
import { IRouter } from "@aurelia/router";
import { IValidationController } from "@aurelia/validation-html";
import { newInstanceForScope } from "@aurelia/kernel";
import template from './GenerateCodeDetailSearchView.html';
import { customElement, resolve } from 'aurelia';
import download from 'downloadjs'
import { I18N } from "@aurelia/i18n";
import GenerateCodeSearchCriteria from "../../Scripts/AppServiceContract/GenerateCodeSearchCriteria";
import GenerateCodeAppService from "../../Scripts/AppServiceContract/GenerateCodeAppService";
import GenerateCodeParameter from "../../Scripts/AppServiceContract/GenerateCodeParameter";
import QRData from "../../Scripts/AppServiceContract/QRData";
import GenerateCodeData from "../../Scripts/AppServiceContract/GenerateCodeData";
import { App } from "app";
import { fs } from "Config/FsConfig";
import ExportCodeRequest from "../../Scripts/AppServiceContract/ExportCodeRequest";
import moment from "moment";


@customElement({
    name: 'GenerateCodeDetailSearchView',
    template
})

export default class GenerateCodeDetailSearchVM extends SearchVMBase2<GenerateCodeDetailEditorVM, GenerateCodeSearchCriteria>{
    Group: string;
    Name: string;
    
    i18n: any;
    QREntityId: string;
    DateFrom: Date;
    DateTo: Date;
    generateCodeData: GenerateCodeData;
    router: IRouter = resolve(IRouter)
    ValidationController = resolve(
        newInstanceForScope(IValidationController)
    ) as IValidationController;


    constructor() {
        super(GenerateCodeDetailEditorVM);

      


        this.i18n = this.container.get(I18N);

        this.SearchAsync();

    }
    async load(params) {
        this.QREntityId = params.id;
        await this.LoadAsync(params.id);
    }

    async LoadAsync(Id: string) {
        const self = this;
        if (Id != null && Id != 'undefined') {
            self.Id = Id;
            await self.LoadData();
            await self.SearchAsync();

        }
    }
    async LoadData() {

        const service = this.container.get(GenerateCodeAppService) as GenerateCodeAppService;
        try {
            const result = await service.LoadAsync(this.CreateCriteria()) as GenerateCodeData;
            this.generateCodeData = result;
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }
    async SearchItemsAsync(searchCallback: (result: QRData[]) => void, searchCriteria: GenerateCodeSearchCriteria, sortingCriteria: SortingCriteria, pagingCriteria: PagingCriteria) {
        const self = this;

        const service = this.container.get(GenerateCodeAppService) as GenerateCodeAppService;

        const criteria = new GenerateCodeParameter();
        criteria.Criteria = searchCriteria;
        criteria.SortingCriteria = sortingCriteria;
        criteria.PagingCriteria = pagingCriteria;

        try {
            const result = await service.FindQRAsync(criteria) as QRData[];
            searchCallback(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }



    async CountItemsAsync(countCallback: (result: number) => void) {
        var self = this;
        const req = self.CreateCriteria();

        const service = this.container.get(GenerateCodeAppService) as GenerateCodeAppService;

        try {
            const result = await service.QRCount(req);
            countCallback(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    CreateCriteria(): GenerateCodeSearchCriteria {
        const cri = new GenerateCodeSearchCriteria();
        cri.QREntityId = $.trim(this.QREntityId);
        cri.DateFrom = FsUtility.ToJsonDate(this.DateFrom)
        cri.DateTo = FsUtility.ToJsonDate(this.DateTo)
        return cri;
    }
    ClearAsync() {
        this.DateFrom = null;
        this.DateTo = null;
        this.SearchAsync();
    }
    

    ExportAllActive = true;
    Id: string;
    ExportFrom: Date;
    ExportTo: Date;

    Export() {
        var self = this;
        var download_url = fs.Config.ServiceBaseUrl + 'modules/WanaD.AppService/GenerateCodeAppService/ExportCode';
        var x = new XMLHttpRequest();
        x.open("POST", download_url, true);
        var user = this.container.get("user");
        if (user != null) {
            x.setRequestHeader('Authorization', 'Bearer ' + user['access_token']);
        }
        x.setRequestHeader('Content-Type', 'application/json');
        x.responseType = 'blob';
        var app = this.container.get(App) as App;
        app.isLoading = true;
        x.onload = function (e) {
            download(x.response, "Code_From" + (moment(self.ExportFrom)).format('DD-MMM-YYYY') + "To" + (moment(self.ExportTo)).format('DD-MMM-YYYY') + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            app.isLoading = false;
            self.ExportAllActive = true
            self.ExportFrom = null
            self.ExportTo = null
        }
        var data = new ExportCodeRequest();
        data.Id = self.Id;
        data.From = FsUtility.ToJsonDate(self.ExportFrom);
        data.To = FsUtility.ToJsonDate(self.ExportTo);
        data.Type = self.generateCodeData.Group;
        data.AllActive = self.ExportAllActive;
        x.send(JSON.stringify(data));

    }
}
