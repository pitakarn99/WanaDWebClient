/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */

import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import { IRouter } from "@aurelia/router";
import OrderData from "../../Scripts/AppServiceContract/OrderData";
import OrderAppService from "../../Scripts/AppServiceContract/OrderAppService";
import { IValidationController } from "@aurelia/validation-html";
import { newInstanceForScope } from "@aurelia/kernel";
import template from './OrderDetailView.html';
import { customElement, resolve } from 'aurelia';
import ProductTypeData from "../../Scripts/AppServiceContract/ProductTypeData";
import FactorySearchCriteria from "../../Scripts/AppServiceContract/FactorySearchCriteria";
import ProductMasterData from "../../Scripts/AppServiceContract/ProductMasterData";
import ProductMasterSearchCriteria from "../../Scripts/AppServiceContract/ProductMasterSearchCriteria";
import { param } from "jquery";
import OrderRequest from "../../Scripts/AppServiceContract/OrderRequest";
import { IValidationRules } from "@aurelia/validation";

@customElement({
    name: 'OrderDetailView',
    template
})

export default class OrderDetailEditorVM extends EditorVMBase {
    Id: string;
    OrderId: string;
    FactoryId: string;
    SelectedFactory: any;
    SelectedProduct: any;
    productTypeId: string;
    Quantity: number;
    UnitPrice: number;
    DueDate: Date;
    Remark: string;
    router: IRouter = resolve(IRouter);
    dialogService: any;
    IsCreate: boolean;
    PackagingSize: string;
    PackagingType: string;
    Ingredients: string;
    ProductName: string;
    RequestDate: Date;
    OrderNo: string;

    ProductMasterId: string;
    ProductMasterData: ProductMasterData;
    StatusCode: string;
    StatusName: string;
    WorkflowDocumentId: string;
    ShowEdit: boolean;
    ButtonStatus: string;
    tempOrderId: string;
    ValidationController = resolve(newInstanceForScope(IValidationController)) as IValidationController;
    ValidationRules = resolve(IValidationRules) as IValidationRules;

    get ProductTypeId(): string {
        return this.productTypeId
    }
    set ProductTypeId(data: string) {
        this.productTypeId = data;
        if (data != null) {
            this.Quantity = null;
            this.UnitPrice = null;
            this.DueDate = null;
            this.SelectedProduct = null;
        }
    }


    constructor() {
        super();
        this.ValidationRules.on(this)
            .ensure('SelectedFactory').required().withMessage('Factory Name is required.')
            .ensure('SelectedProduct').required().withMessage('Product is required.')
            .ensure('ProductTypeId').required().withMessage('Product Type is required.')
            .ensure('DueDate').required().withMessage('Due Date is required.')
            .ensure('Quantity').required().withMessage('Quantity is required.')
            .ensure('UnitPrice').required().withMessage('Unit Price is required.');
        this.IsCreate = true;
        this.FindProductType();
    }

    async loading(params) {
        if (params.id != null) {
            await this.SearchOrder(params.id);
            this.tempOrderId = params.id;
            this.IsCreate = false;
        }
        else {
            this.BeginEdit();
        }
    }

    async PrepareChildVMsAsync() {
        super.PrepareChildVMsAsync();
    }

    async LoadOriginalSourceAsync(originalSource: OrderData) {
        this.Id = originalSource.Id;
        this.FactoryId = originalSource.FactoryId;
        this.ProductTypeId = originalSource.ProductTypeId;
        this.ProductName = originalSource.ProductName;
        this.RequestDate = originalSource.RequestDate;
        this.DueDate = FsUtility.CreateDateObject(FsUtility.ParseDate(originalSource.DueDate, 1));
        this.Remark = originalSource.Remark;
        this.OrderNo = originalSource.OrderNo;
        this.UnitPrice = originalSource.UnitPrice;
        this.Quantity = originalSource.Quantity;
        this.SelectedProduct = originalSource.ProductMasterData;
        this.SelectedFactory = originalSource.FactoryData;
        this.StatusCode = originalSource.StatusCode;
        this.StatusName = originalSource.StatusName;
        this.WorkflowDocumentId = originalSource.WorkflowDocumentId;
        this.HasOriginalSource = true;
    }

    async SaveOriginalSourceAsync(originalSource: OrderData) {
        originalSource.Id = this.Id;
        originalSource.FactoryId = this.FactoryId;
        originalSource.ProductTypeId = this.ProductTypeId;
        originalSource.ProductName = this.ProductName;
        originalSource.RequestDate = this.RequestDate;
        originalSource.DueDate = this.DueDate;
        originalSource.Remark = this.Remark;
        originalSource.OrderNo = this.OrderNo;
        originalSource.UnitPrice = this.UnitPrice;
        originalSource.Quantity = this.Quantity;
        originalSource.ProductMasterData = this.SelectedProduct;
        originalSource.FactoryData = this.SelectedFactory;
        originalSource.StatusCode = this.StatusCode;
        originalSource.StatusName = this.StatusName;
        originalSource.WorkflowDocumentId = this.WorkflowDocumentId;
    }

    async SearchOrder(id: string) {
        const self = this;
        const service = this.container.get(OrderAppService) as OrderAppService;
        try {
            const result = await service.FindByIdAsync(id) as OrderData;
            await self.SetOriginalSourceAsync(result);

            if (this.StatusCode == "New") {
                this.ShowEdit = false;
            }
            this.PrepareChildVMsAsync();
        }
        catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    CreateRequest(): OrderData {
        const currentDate = new Date();
        const criteria = new OrderData();
        criteria.Id = this.Id;
        criteria.FactoryId = this.SelectedFactory == null ? "" : this.SelectedFactory.id;
        criteria.ProductMasterId = this.SelectedProduct == null ? "" : this.SelectedProduct.id;
        criteria.ProductTypeId = this.ProductTypeId;
        criteria.Quantity = this.Quantity;
        criteria.UnitPrice = this.UnitPrice;
        criteria.DueDate = FsUtility.ToJsonDate(this.DueDate);
        criteria.RequestDate = FsUtility.ToJsonDate(currentDate);
        criteria.Remark = this.Remark;
        criteria.Price = this.Quantity * this.UnitPrice;
        criteria.OrderNo = this.OrderNo == null ? "" : this.OrderNo;
        criteria.Id = this.Id;
        criteria.StatusCode = this.StatusCode;
        return criteria;
    }


    SaveData() {
        const self = this;
        self.ValidationController.validate({ object: self }).then(async result => {
            if (result.valid) {
                await this.SaveAsync(null, null);
            }
        });
    }

    async SaveAsync(doneCallback: () => void, failCallback: (error) => void) {
        const self = this;
        const request = await this.CreateRequest();
        const service = this.container.get(OrderAppService) as OrderAppService;
        if (this.IsCreate) {
            try {
                const resultId = await service.OrderSaveAsync(request);
                //const result = await service.FindByIdAsync(resultId) as OrderData;
                //this.Id = result.Id;
                //this.OrderId = result.Id;
                //this.FactoryId = result.FactoryId;
                //this.ProductTypeId = result.ProductTypeId;
                //this.ProductMasterId = result.ProductMasterId;
                //this.RequestDate = result.RequestDate;
                //this.DueDate = result.DueDate;
                //this.Remark = result.Remark;
                //this.OrderNo = result.OrderNo;
                //this.UnitPrice = result.UnitPrice;
                //this.Quantity = result.Quantity;

                this.PrepareChildVMsAsync();
                FsUtility.AlertModal("The item has been save successfully", 2, 1, async function (click) {
                    if (click == true) {
                        if (doneCallback != null) {
                            doneCallback();
                        }
                        await self.EndEditAsync();
                        self.router.load("Modules/WanaD/ManageOrderPage/");
                    }
                });
            }
            catch (error) {
                FsUtility.CommonErrorHandler(error);
            }
        }
        else {
            try {
                const resultId = await service.OrderUpdateAsync(request);
                this.OrderId = resultId;
                FsUtility.AlertModal("The item has been updated successfully", 2, 1, async function (click) {
                    if (click == true) {
                        if (doneCallback != null) {
                            doneCallback();
                        }
                        await self.EndEditAsync();
                        self.router.load("Modules/WanaD/OrderDetailPage/" + resultId);
                    }
                });
            }
            catch (error) {
                FsUtility.CommonErrorHandler(error);
            }
        }
    }

    ProductTypeDatas: ProductTypeData[];
    async FindProductType() {
        const service = this.container.get(OrderAppService) as OrderAppService;
        try {
            const result = await service.FindProductTypeAsync() as ProductTypeData[];
            this.ProductTypeDatas = result;
        }
        catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    async FindProductMasterAutoComplete(params, success, failure) {
        const self = this;
        const service = self.container.get(OrderAppService) as OrderAppService;
        const data = params.data.term == null ? "" : params.data.term;
        try {
            const SearchData = new ProductMasterSearchCriteria;
            SearchData.Name = data;
            SearchData.ProductTypeId = this.ProductTypeId;
            const result = await service.FindProductMasterAutoCompleteAsync(SearchData) as ProductMasterData[];
            success(result);
        }
        catch (error) {
            FsUtility.CommonErrorHandler(error);
            failure(error);
        }
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

    BackPage() {
        const self = this;
        self.router.load("Modules/WanaD/ManageOrderPage");
    }

    async CancelAsync() {
        const self = this;
        if (self.IsCreate)
            self.router.load("Modules/WanaD/ManageOrderPage");
        else {
            await this.SetIsEditing(false);
            if (self.HasOriginalSource)
                await this.LoadOriginalSourceAsync(self.OriginalSource);
        }
    }

    TotalPrice: number;
    NumberFormat(data) {
        this.TotalPrice = data;

        if (data == null || data == undefined) {
            this.TotalPrice = 0;
            return this.TotalPrice;
        }
        else {

            return data.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        }
    }

    IsProductType: boolean;
    IsProduct: boolean;
    IsQuantity: boolean;
    IsUnitPrice: boolean;
    IsDueDate: boolean;
    IsRemark: boolean;
    RejectStartEditField() {
        this.IsQuantity = true;
        this.IsUnitPrice = true;
        this.IsDueDate = true;
        this.IsRemark = true;
        this.ButtonStatus = "RejectEditing";
    }

    WithDrawEditField() {
        this.IsQuantity = true;
        this.IsUnitPrice = true;
        this.IsDueDate = true;
        this.IsRemark = true;
        this.ButtonStatus = "WithDrawEditing";
    }

    async CancelEditField() {
        const self = this;
        this.IsQuantity = false;
        this.IsUnitPrice = false;
        this.IsDueDate = false;
        this.IsRemark = false;
        this.ButtonStatus = "Normal";

        await this.SetIsEditing(false);
        if (self.HasOriginalSource) {
            await this.LoadOriginalSourceAsync(self.OriginalSource);
        }
    }

    async CloseOrder() {
        const self = this;
        const service = self.container.get(OrderAppService) as OrderAppService;
        const request = new OrderRequest();
        request.OrderId = self.tempOrderId;
        request.StatusCode = self.StatusCode;
        try {
            await service.CloseOrderAsync(request);
            FsUtility.AlertModal("Closed order successfully", 2, 1, async function (click) {
                if (click == true) {

                    self.router.load("Modules/WanaD/ManageOrderPage/");
                }
            });
        }
        catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    async ReSubmitOrder() {
        const self = this;
        const request = await this.CreateRequest();
        request.IsReSubmit = true;
        const service = this.container.get(OrderAppService) as OrderAppService;
        try {
            await service.ReSubmitOrderAsync(request);

            FsUtility.AlertModal("Resubmited order successfully", 2, 1, async function (click) {
                if (click == true) {

                    self.router.load("Modules/WanaD/ManageOrderPage/");
                }
            });
        }
        catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    async WithDrawOrder() {
        debugger
        const self = this;
        const service = self.container.get(OrderAppService) as OrderAppService;
        const request = new OrderRequest();
        request.OrderId = self.tempOrderId;
        try {
            await service.WithdrawOrderAsync(request);
            FsUtility.AlertModal("Withdrawn order successfully", 2, 1, async function (click) {
                if (click == true) {

                    self.router.load("Modules/WanaD/ManageOrderPage/");
                }
            });
        }
        catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }





}
