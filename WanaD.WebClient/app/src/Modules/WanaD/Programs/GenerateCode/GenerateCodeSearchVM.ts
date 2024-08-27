/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-async-promise-executor */

import SearchVMBase2 from "Lib/Fs.SmartClient.Client/SearchVMBase2";
import PagingCriteria from "Lib/Fs.Core.Data/PagingCriteria";
import SortingCriteria from "Lib/Fs.Core.Data/SortingCriteria";
import SortBy from "Lib/Fs.Core.Data/SortBy";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import GenerateCodeEditorVM from "./GenerateCodeEditorVM";
import { IRouter } from "@aurelia/router";
import {  IDialogService } from "@aurelia/dialog";
import { IValidationController } from "@aurelia/validation-html";
import { newInstanceForScope } from "@aurelia/kernel";

import template from './GenerateCodeSearchView.html';
import { customElement, inject, resolve } from 'aurelia';


import { I18N } from "@aurelia/i18n";
import GenerateCodeSearchCriteria from "../../Scripts/AppServiceContract/GenerateCodeSearchCriteria";
import GenerateCodeAppService from "../../Scripts/AppServiceContract/GenerateCodeAppService";
import GenerateCodeParameter from "../../Scripts/AppServiceContract/GenerateCodeParameter";
import GenerateCodeData from "../../Scripts/AppServiceContract/GenerateCodeData";
import GeneralPopupEditDialog from "Lib/Fs.Core.Aurelia/Components/GeneralPopupEditDialog";

@customElement({
    name: 'GenerateCodeSearchView',
    template
})
@inject(IDialogService)
export default class GenerateCodeSearchVM extends SearchVMBase2<GenerateCodeEditorVM, GenerateCodeSearchCriteria>{
    Group: string;
    Name: string;
    router: IRouter = resolve(IRouter)
    i18n: any;



    ValidationController = resolve(IValidationController) as IValidationController;
    dialogService: IDialogService = resolve(IDialogService)
    constructor() {
        super(GenerateCodeEditorVM);
        var self = this;
        
        this.i18n = this.container.get(I18N);
        
        this.SearchAsync();

    }


    async SearchItemsAsync(searchCallback: (result: GenerateCodeData[]) => void, searchCriteria: GenerateCodeSearchCriteria, sortingCriteria: SortingCriteria, pagingCriteria: PagingCriteria) {
        const self = this;

        const service = this.container.get(GenerateCodeAppService) as GenerateCodeAppService;

        const criteria = new GenerateCodeParameter();
        criteria.Criteria = searchCriteria;
        criteria.SortingCriteria = sortingCriteria;
        criteria.PagingCriteria = pagingCriteria;

        try {
            const result = await service.FindAsync(criteria) as GenerateCodeData[];
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
            const result = await service.Count(req);
            countCallback(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    CreateCriteria(): GenerateCodeSearchCriteria{
        const cri = new GenerateCodeSearchCriteria();
        cri.Group = $.trim(this.Group);
        cri.Name = $.trim(this.Name);
        return cri;
    }

    async GenerateCode() {
        const text = await import("./GenerateCodeDialogView.html");
        const editorVM = await this.CreateNewItemAsync();
        this.dialogService
            .open({
                component: () => GeneralPopupEditDialog,
                model: {
                    view: text.default,
                    viewModel: editorVM,
                    Header: "Generate",
                    BtnSaveClass: "btn btn-primary",
                    BtnCancelClass: "btn btn-outline-secondary",
                    BtnCloseClass: "btn btn-outline-secondary ",
                    BtnEditorClass: "btn btn-primary",
                },
                lock: false,
            })
            .whenClosed(async (response) => {
                if (response.status === "ok") {
                    //
                } else {
                    await this.RemoveCommandAsync(editorVM);
                }
            });
    }
  
    EditUrl(editorVM: GenerateCodeEditorVM) {

        this.router.load("Modules/WanaD/ManageGenerateCodeDetailPage/" + editorVM.Id);
    }

}
