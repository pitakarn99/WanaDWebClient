
 

 

 

    import ProductMasterData from 'Modules/WanaD/Scripts/AppServiceContract/ProductMasterData';

    import FactoryData from 'Modules/WanaD/Scripts/AppServiceContract/FactoryData';

 
class OrderData 
{
    
        Id: string;
    
        FactoryId: string;
    
        ProductTypeId: string;
    
        ProductMasterId: string;
    
        DeliveredDate: Date;
    
        FinishedDate: Date;
    
        Price: number;
    
        UnitPrice: number;
    
        OrderStatus: string;
    
        Remark: string;
    
        OrderNo: string;
    
        Quantity: number;
    
        DueDate: Date;
    
        RequestDate: Date;
    
        ProductName: string;
    
        ProductTypeName: string;
    
        FactoryName: string;
    
        Received: number;
    
        Percent: number;
    
        ProductMasterData: ProductMasterData;
    
        FactoryData: FactoryData;
    
        Unit: string;
    
        ProductMasterNo: string;
    
        StatusCode: string;
    
        StatusName: string;
    
        WorkflowDocumentId: string;
    
        PaidAmount: number;
    
        IsReSubmit: boolean;
    
        ProductTypeCode: string;
    
}
 
export default OrderData;
 




