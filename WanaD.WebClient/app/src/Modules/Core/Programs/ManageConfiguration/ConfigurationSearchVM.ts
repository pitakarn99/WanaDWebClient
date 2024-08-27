/* eslint-disable no-async-promise-executor */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import SearchVMBase2 from "Lib/Fs.SmartClient.Client/SearchVMBase2";
import PagingCriteria from "../../../../Lib/Fs.Core.Data/PagingCriteria";
import SortingCriteria from "../../../../Lib/Fs.Core.Data/SortingCriteria";
import ConfigurationEditorVM from "./ConfigurationEditorVM";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import ConfigurationSearchCriteria from "../../Scripts/AppServiceContract/ConfigurationSearchCriteria";
import ConfigurationItemCategoryData from "../../Scripts/AppServiceContract/ConfigurationItemCategoryData";
import { EventAggregator, resolve } from "aurelia";
import ConfigurationAppService from "../../Scripts/AppServiceContract/ConfigurationAppService";
import ConfigurationSearchParameter from "../../Scripts/AppServiceContract/ConfigurationSearchParameter";
import ConfigurationData from "../../Scripts/AppServiceContract/ConfigurationData";
import { IValidationRules } from "@aurelia/validation";
import { IValidationController } from "@aurelia/validation-html";
import { newInstanceForScope } from "@aurelia/kernel";
import template from './ConfigurationSearchView.html';
import { customElement } from 'aurelia';

@customElement({
    name: 'ConfigurationSearchView',
    template
})
export default class ConfigurationSearchVM extends SearchVMBase2<ConfigurationEditorVM, ConfigurationSearchCriteria>{
    //public eventAggregator: EventAggregator;
    //public changeLocaleSubscribe: any;
    public codePage: string;
    public notePage: string;
    public header: string;
    public note: string;
    public CategoryCode: string = 'Configuration';
    ConfigurationCategoryList: ConfigurationItemCategoryData[];
    configurationCode: string;
    isStucture: boolean = false;
    ValidationController = resolve(
        newInstanceForScope(IValidationController)
    ) as IValidationController;
    ValidationRules = resolve(IValidationRules) as IValidationRules;
    constructor() {
        super(ConfigurationEditorVM);
        var self = this;

        new Promise(async () => {
            await this.SearchDropdownAsync();
        }).then(async () => {
            await this.SearchAsync();
        });
        this.IsSearchAfterSave = true;
        this.IsClearSelectionAfterSave = true;
        //self.eventAggregator = eventAggregator;
        //self.changeLocaleSubscribe = self.eventAggregator.subscribe('ChangeLocale', async function (response) {
        //    await self.SearchAsync();
        //    await self.SearchDropdownAsync();
        //});
    }
    loading(params, route) {

        const self = this;

        //if (typeof route !== "undefined") {

        //    this.codePage = route.settings.Header;
        //    this.notePage = route.settings.Note;
        //}

        this.SearchAsync();
    }

    async SearchDropdownAsync() {
        var service = this.container.get(ConfigurationAppService) as ConfigurationAppService;
        try {
            this.ConfigurationCategoryList = await service.FindCategoryDataAsync();
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    async SearchItemsAsync(searchCallback: (result: ConfigurationData[]) => void, searchCriteria: ConfigurationSearchCriteria, sortingCriteria: SortingCriteria, pagingCriteria: PagingCriteria) {
        var self = this;
        if (this.CategoryCode != null) {
            var searchParameter = new ConfigurationSearchParameter();
            searchParameter.SearchCriteria = searchCriteria;
            searchParameter.SortingCriteria = sortingCriteria;
            searchParameter.PagingCriteria = pagingCriteria;
            var service = this.container.get(ConfigurationAppService) as ConfigurationAppService;
            try {
                var result = await service.FindAsync(searchParameter);
                searchCallback(result);
            } catch (error) {
                FsUtility.CommonErrorHandler(error);
            }
        }
    }

    async CountItemsAsync(countCallback: (result: number) => void) {
        var self = this;
        var req = self.CreateCriteria();


        if (this.CategoryCode != null) {

            var service = this.container.get(ConfigurationAppService) as ConfigurationAppService;
            try {
                var result = await service.CountAsync(req);
                countCallback(result);
            } catch (error) {
                FsUtility.CommonErrorHandler(error);
            }
        }

    }

    CreateCriteria(): ConfigurationSearchCriteria {
        var criteria = new ConfigurationSearchCriteria();
        criteria.CategoryCode = this.CategoryCode;
        return criteria;
    }

    async SelectConfigurationAsync(val) {
        this.CategoryCode = val
        await this.SearchAsync()
    }
}
