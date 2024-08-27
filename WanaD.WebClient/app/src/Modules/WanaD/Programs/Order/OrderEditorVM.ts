/* eslint-disable @typescript-eslint/no-this-alias */

import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import OrderData from "../../Scripts/AppServiceContract/OrderData";
import OrderAppService from "../../Scripts/AppServiceContract/OrderAppService";
import OrderSearchVM from "./OrderSearchVM";

export default class OrderEditorVM extends EditorVMBase {
    Id: string;
    FactoryName: string;
    ProductTypeName: string;
    ProductName: string;
    RequestDate: Date;
    DueDate: Date;
    Remark: string;
    OrderNo: string;
    Price: number;
    Quantity: number;
    Received: number;
    Percent: number;
    StatusCode: string;
    StatusName: string;
    WorkflowDocumentId: string;
    PaidAmount: number;

    constructor() {
        super();
        this.ValidationRules.on(this);
    }

    async LoadOriginalSourceAsync(originalSource: OrderData) {
        this.Id = originalSource.Id;
        this.FactoryName = originalSource.FactoryName;
        this.ProductTypeName = originalSource.ProductTypeName;
        this.ProductName = originalSource.ProductName;
        this.RequestDate = originalSource.RequestDate;
        this.DueDate = originalSource.DueDate;
        this.Remark = originalSource.Remark;
        this.OrderNo = originalSource.OrderNo;
        this.Price = originalSource.Price;
        this.Quantity = originalSource.Quantity;
        this.Received = originalSource.Received;
        this.Percent = originalSource.Percent;
        this.StatusCode = originalSource.StatusCode;
        this.StatusName = originalSource.StatusName;
        this.WorkflowDocumentId = originalSource.WorkflowDocumentId;
        this.PaidAmount = originalSource.PaidAmount == null ? 0.00 : originalSource.PaidAmount;
    }

    async SaveOriginalSourceAsync(originalSource: OrderData) {
        originalSource.Id = this.Id;
        originalSource.FactoryName = this.FactoryName;
        originalSource.ProductTypeName = this.ProductTypeName;
        originalSource.ProductName = this.ProductName;
        originalSource.RequestDate = this.RequestDate;
        originalSource.DueDate = this.DueDate;
        originalSource.Remark = this.Remark;
        originalSource.OrderNo = this.OrderNo;
        originalSource.Price = this.Price;
        originalSource.Quantity = this.Quantity;
        originalSource.Received = this.Received;
        originalSource.Percent = this.Percent;
        originalSource.StatusCode = this.StatusCode;
        originalSource.StatusName = this.StatusName;
        originalSource.WorkflowDocumentId = this.WorkflowDocumentId;
        originalSource.PaidAmount = this.PaidAmount;
    }

    async RemoveAsync(searchVM: OrderSearchVM, removeCallback: () => Promise<void>) {

        const self = this;
        FsUtility.AlertModal("Are you sure you want to delete?", 3, 3, async (result) => {
            if (result) {
                const service = self.container.get(OrderAppService) as OrderAppService;
                try {
                    await service.OrderRemoveAsync(self.Id);
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




}
