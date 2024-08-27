/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-async-promise-executor */

import SearchVMBase2 from "Lib/Fs.SmartClient.Client/SearchVMBase2";
import PagingCriteria from "Lib/Fs.Core.Data/PagingCriteria";
import SortingCriteria from "Lib/Fs.Core.Data/SortingCriteria";
import SortBy from "Lib/Fs.Core.Data/SortBy";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import { IRouter } from "@aurelia/router";
import template from './FactorySearchView.html';
import { customElement, resolve } from 'aurelia';
import FactoryEditorVM from "./FactoryEditorVM";
import FactorySearchCriteria from "../../Scripts/AppServiceContract/FactorySearchCriteria";
import FactoryData from "../../Scripts/AppServiceContract/FactoryData";
import FactoryAppService from "../../Scripts/AppServiceContract/FactoryAppService";
import FactoryParameter from "../../Scripts/AppServiceContract/FactoryParameter";
import { IValidationController } from "@aurelia/validation-html";
import { newInstanceForScope } from "@aurelia/kernel";

@customElement({
    name: 'FactorySearchView',
    template
})

export default class FactorySearchVM extends SearchVMBase2<FactoryEditorVM, FactorySearchCriteria>{
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
    Gender: number;
    IsThaiNationality: boolean;

    router: IRouter = resolve(IRouter)

    ValidationController = resolve(
        newInstanceForScope(IValidationController)
    ) as IValidationController;

    constructor() {
        super(FactoryEditorVM);
     
        this.SearchAsync();
        

    }

    async SearchItemsAsync(searchCallback: (result: FactoryData[]) => void, searchCriteria: FactorySearchCriteria, sortingCriteria: SortingCriteria, pagingCriteria: PagingCriteria) {
        const self = this;
        const service = this.container.get(FactoryAppService) as FactoryAppService;

        const criteria = new FactoryParameter();
        criteria.Criteria = searchCriteria;
        criteria.SortingCriteria = sortingCriteria;
        criteria.PagingCriteria = pagingCriteria;

        try {
            const result = await service.FindAsync(criteria) as FactoryData[];
            searchCallback(result);
        }
        catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    PrepareDefaultSortingCriteria(sortingCriteria: SortingCriteria) {
        const sortBy = new SortBy();
        sortBy.Direction = 0;
        sortBy.Name = "NameTH";
        sortingCriteria.push(sortBy);
    }

    async CountItemsAsync(countCallback: (result: number) => void) {
        var self = this;
        const req = self.CreateCriteria();
        const service = this.container.get(FactoryAppService) as FactoryAppService;

        try {
            const result = await service.Count(req);
            countCallback(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    CreateCriteria(): FactorySearchCriteria {
        const cri = new FactorySearchCriteria();
        cri.Name = this.Name == null ? null : this.Name.trim();
        return cri;
    }

    async RemoveCommandAsync(editorVM: FactoryEditorVM) {
        await super.RemoveCommandAsync(editorVM);
    }

    async ClearAsync(): Promise<void> {
        this.Name = null;
        await this.SearchAsync();
    }

    ViewData(item) {
        this.router.load("Modules/WanaD/FactoryDetailPage/" + item.Id);
    }

    AddFactory() {        
        this.router.load("Modules/WanaD/FactoryAddPage/");
    }




    //InitializeLoadingItem(editorVM: FactoryEditorVM) {
    //    editorVM.router = this.router;
    //}

}
