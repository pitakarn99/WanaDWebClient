
 

 

 

    import ProductMasterData from 'Modules/WanaD/Scripts/AppServiceContract/ProductMasterData';

    import ProductMasterProcessingData from 'Modules/WanaD/Scripts/AppServiceContract/ProductMasterProcessingData';

 
class ProductionData 
{
    
        Id: string;
    
        QRId: string;
    
        OrderId: string;
    
        ProductionDate: Date;
    
        Quantity: number;
    
        ProductLotNo: string;
    
        Note: string;
    
        ProductTypeName: string;
    
        ProductMasterName: string;
    
        ProductMasterNo: string;
    
        OrderNo: string;
    
        Unit: string;
    
        Status: string;
    
        ProductMasterData: ProductMasterData;
    
        ProductProcessingDatas: any;
    
        ProductMasterProcessingData: ProductMasterProcessingData;
    
        ProductMemberDatas: any;
    
        ProductTypeCode: string;
    
}
 
export default ProductionData;
 




