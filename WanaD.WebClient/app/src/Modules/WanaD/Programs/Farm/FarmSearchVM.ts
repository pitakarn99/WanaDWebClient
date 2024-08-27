/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-async-promise-executor */

import SearchVMBase2 from "Lib/Fs.SmartClient.Client/SearchVMBase2";
import PagingCriteria from "Lib/Fs.Core.Data/PagingCriteria";
import SortingCriteria from "Lib/Fs.Core.Data/SortingCriteria";
import SortBy from "Lib/Fs.Core.Data/SortBy";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import { IRouter } from "@aurelia/router";
import template from './FarmSearchView.html';
import { customElement, resolve } from 'aurelia';
import FarmEditorVM from "./FarmEditorVM";
import FarmSearchCriteria from "../../Scripts/AppServiceContract/FarmSearchCriteria";
import FarmData from "../../Scripts/AppServiceContract/FarmData";
import FarmAppService from "../../Scripts/AppServiceContract/FarmAppService";
import FarmParameter from "../../Scripts/AppServiceContract/FarmParameter";
import { IValidationController } from "@aurelia/validation-html";
import { newInstanceForScope } from "@aurelia/kernel";

@customElement({
    name: 'FarmSearchView',
    template
})
export default class FarmSearchVM extends SearchVMBase2<FarmEditorVM, FarmSearchCriteria>{
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

    constructor( ) {
        super(FarmEditorVM);
        
        this.SearchAsync();

    }

    //getTemplate(e: any) {
    //    var key = e.target.data('title');
    //    this.CurrentItem.ErrorList = this.CurrentItem.getValidateErrors(key);
    //    return () => this.template.template
    //}

    async SearchItemsAsync(searchCallback: (result: FarmData[]) => void, searchCriteria: FarmSearchCriteria, sortingCriteria: SortingCriteria, pagingCriteria: PagingCriteria) {
        const self = this;
        const service = this.container.get(FarmAppService) as FarmAppService;

        const criteria = new FarmParameter();
        criteria.Criteria = searchCriteria;
        criteria.SortingCriteria = sortingCriteria;
        criteria.PagingCriteria = pagingCriteria;

        try {
            const result = await service.FindAsync(criteria) as FarmData[];
            searchCallback(result);
        }
        catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    PrepareDefaultSortingCriteria(sortingCriteria: SortingCriteria) {
        const sortBy = new SortBy();
        sortBy.Direction = 0;
        sortBy.Name = "Name";
        sortingCriteria.push(sortBy);
    }

    async CountItemsAsync(countCallback: (result: number) => void) {
        var self = this;
        const req = self.CreateCriteria();

        const service = this.container.get(FarmAppService) as FarmAppService;

        try {
            const result = await service.Count(req);
            countCallback(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    CreateCriteria(): FarmSearchCriteria {
        const cri = new FarmSearchCriteria();
        cri.Name = $.trim(this.Name);

        return cri;
    }

    async RemoveCommandAsync(editorVM: FarmEditorVM) {
        await super.RemoveCommandAsync(editorVM);
    }

    async ClearAsync(): Promise<void> {
        this.Name = null;
        await this.SearchAsync();
    }

    ViewData(item) {
        this.router.load("Modules/WanaD/FarmDetailPage/" + item.Id);
    }

    AddFarm() {        
        this.router.load("Modules/WanaD/FarmAddPage/");
    }




    //InitializeLoadingItem(editorVM: FarmEditorVM) {
    //    editorVM.router = this.router;
    //}

}
