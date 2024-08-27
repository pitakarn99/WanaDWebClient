/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-async-promise-executor */

import SearchVMBase2 from "Lib/Fs.SmartClient.Client/SearchVMBase2";
import PagingCriteria from "Lib/Fs.Core.Data/PagingCriteria";
import SortingCriteria from "Lib/Fs.Core.Data/SortingCriteria";
import SortBy from "Lib/Fs.Core.Data/SortBy";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import { IRouter } from "@aurelia/router";
import template from './OrderSearchView.html';
import { customElement, resolve } from 'aurelia';
import OrderEditorVM from "./OrderEditorVM";
import OrderSearchCriteria from "../../Scripts/AppServiceContract/OrderSearchCriteria";
import OrderData from "../../Scripts/AppServiceContract/OrderData";
import OrderAppService from "../../Scripts/AppServiceContract/OrderAppService";
import OrderParameter from "../../Scripts/AppServiceContract/OrderParameter";
import { IValidationController } from "@aurelia/validation-html";
import { newInstanceForScope } from "@aurelia/kernel";
import FactorySearchCriteria from "../../Scripts/AppServiceContract/FactorySearchCriteria";


@customElement({
    name: 'OrderSearchView',
    template
})
export default class OrderSearchVM extends SearchVMBase2<OrderEditorVM, OrderSearchCriteria>{

    router: IRouter = resolve(IRouter);
    ValidationController = resolve(
        newInstanceForScope(IValidationController)
    ) as IValidationController;
    SelectedFactory: any;
    RequestDateFrom: Date;
    RequestDateTo: Date;
    DueDateFrom: Date;
    DueDateTo: Date;
    OrderStatusId: string;
    OrderStatusDatas = [
        { Id: 'New', Name: 'New' },
        { Id: 'Withdraw', Name: 'Withdraw' },
        { Id: 'Accepted', Name: 'Accepted' },
        { Id: 'Rejected', Name: 'Rejected' },
        { Id: 'Closed', Name: 'Closed' },
        { Id: 'Completed', Name: 'Completed' },
        { Id: 'Cancelled', Name: 'Cancelled' },
    ];


    constructor( ) {
        super(OrderEditorVM);
        this.SearchAsync();
    }

    async SearchItemsAsync(searchCallback: (result: OrderData[]) => void, searchCriteria: OrderSearchCriteria, sortingCriteria: SortingCriteria, pagingCriteria: PagingCriteria) {
        const self = this;
        const service = self.container.get(OrderAppService) as OrderAppService;

        const criteria = new OrderParameter();
        criteria.Criteria = searchCriteria;
        criteria.SortingCriteria = sortingCriteria;
        criteria.PagingCriteria = pagingCriteria;

        try {
            const result = await service.FindAsync(criteria) as OrderData[];
            searchCallback(result);
        }
        catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    PrepareDefaultSortingCriteria(sortingCriteria: SortingCriteria) {
        const sortBy = new SortBy();
        sortBy.Direction = 0;
        sortBy.Name = "FactoryId";
        sortingCriteria.push(sortBy);
    }

    async CountItemsAsync(countCallback: (result: number) => void) {
        var self = this;
        const req = self.CreateCriteria();
        const service = self.container.get(OrderAppService) as OrderAppService;

        try {
            const result = await service.Count(req);
            countCallback(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    CreateCriteria(): OrderSearchCriteria {
        const cri = new OrderSearchCriteria();
        this.SelectedFactory == null ? cri.FactoryId = null : cri.FactoryId = this.SelectedFactory.id;
        this.RequestDateFrom == null ? null : cri.RequestDateFrom = FsUtility.ToJsonDate(this.RequestDateFrom);
        this.RequestDateTo == null ? null : cri.RequestDateTo = FsUtility.ToJsonDate(this.RequestDateTo);
        this.DueDateFrom == null ? null : cri.DueDateFrom = FsUtility.ToJsonDate(this.DueDateFrom);
        this.DueDateTo == null ? null : cri.DueDateTo = FsUtility.ToJsonDate(this.DueDateTo);
        this.OrderStatusId == "undefined" ? "" : cri.OrderStatus = this.OrderStatusId;
        //debugger
        return cri;
    }

    async RemoveCommandAsync(editorVM: OrderEditorVM) {
        await super.RemoveCommandAsync(editorVM);
    }

    async ClearAsync(): Promise<void> {
        this.SelectedFactory = null;
        this.RequestDateFrom = null;
        this.RequestDateTo = null;
        this.DueDateFrom = null;
        this.DueDateTo = null;
        this.OrderStatusId = null;
        await this.SearchAsync();
    }

    ViewData(item) {
        this.router.load("Modules/WanaD/OrderDetailPage/" + item.Id);
    }

    AddOrder() {
        this.router.load("Modules/WanaD/AddOrderPage");
    }

    async FindFactoryAutoComplete(params, success, failure) {
        const self = this;
        const service = self.container.get(OrderAppService) as OrderAppService;
        const data = params.data.term == null ? "" : params.data.term;

        try {
            const SearchData = new FactorySearchCriteria;
            SearchData.Name = data;

            const result = await service.FindFactoryAutoCompleteAsync(SearchData);
            success(result);
        }
        catch (error) {
            FsUtility.CommonErrorHandler(error);
            failure(error);
        }
    }
   
    ShowNumber(date) {
        if (date == null || date == "" || date == undefined) {
            return "";
        }
        else {
            return date.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
    }








}
