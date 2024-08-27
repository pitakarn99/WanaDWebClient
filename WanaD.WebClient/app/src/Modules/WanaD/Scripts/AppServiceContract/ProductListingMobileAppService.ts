
 



 
 import {fs} from "Config/FsConfig";
 import { FsAjaxSettings } from "../../../../Lib/Fs.Core.Aurelia/Components/FsAjaxSettings";
 

 
 
    import ProductionListParameter from 'Modules/WanaD/Scripts/AppServiceContract/ProductionListParameter';

    import ProductionListData from 'Modules/WanaD/Scripts/AppServiceContract/ProductionListData';

    import ProductionListSearchCriteria from 'Modules/WanaD/Scripts/AppServiceContract/ProductionListSearchCriteria';

    import ProductTypeData from 'Modules/WanaD/Scripts/AppServiceContract/ProductTypeData';

    import ProductMasterSearchCriteria from 'Modules/WanaD/Scripts/AppServiceContract/ProductMasterSearchCriteria';

    import ProductMasterData from 'Modules/WanaD/Scripts/AppServiceContract/ProductMasterData';

    import OrderData from 'Modules/WanaD/Scripts/AppServiceContract/OrderData';

    import ScanQRCriteria from 'Modules/WanaD/Scripts/AppServiceContract/ScanQRCriteria';

    import ProductData from 'Modules/WanaD/Scripts/AppServiceContract/ProductData';

    import ProductionCreateData from 'Modules/WanaD/Scripts/AppServiceContract/ProductionCreateData';

    import ProductionData from 'Modules/WanaD/Scripts/AppServiceContract/ProductionData';


    //module ProductListingMobileAppService {
    

    class ProductListingMobileAppService {

    ControllerUrl : string
    Options : FsAjaxSettings

    constructor(serverBaseUrl : string = null, controllerPath : string = null, ajaxOptions : FsAjaxSettings = null){
        this.ControllerUrl = ((serverBaseUrl == null || serverBaseUrl == "") ? fs.Config.ServiceBaseUrl : serverBaseUrl) + ((controllerPath == null || controllerPath == "") ?  "modules/WanaD.AppService/ProductListingMobileAppService" : controllerPath);
        this.Options = ajaxOptions;
    }

    public Init(options : any = { serverBaseUrl :  null, controllerPath : null, ajaxOptions : null }){
        this.ControllerUrl = ((options.serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : options.serverBaseUrl) + ((options.controllerPath == null) ?  "modules/WanaD.AppService/ProductListingMobileAppService" : options.controllerPath);
        this.Options = options.ajaxOptions;

        return this;
    }

    
    // post: api/${controller}/
    //public static RouteFindAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ProductListingMobileAppService/FindAsync`;
    public RouteFindAsync() : string {
        return this.ControllerUrl + "/"+"FindAsync";
    }
    public FindAsync(parameter: ProductionListParameter): JQuery.jqXHR<ProductionListData[]> {
        return $.ajax({
                url: this.RouteFindAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(parameter),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteCount = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ProductListingMobileAppService/Count`;
    public RouteCount() : string {
        return this.ControllerUrl + "/"+"Count";
    }
    public Count(criteria: ProductionListSearchCriteria): JQuery.jqXHR<number> {
        return $.ajax({
                url: this.RouteCount(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(criteria),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindProductTypeAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ProductListingMobileAppService/FindProductTypeAsync`;
    public RouteFindProductTypeAsync() : string {
        return this.ControllerUrl + "/"+"FindProductTypeAsync";
    }
    public FindProductTypeAsync(): JQuery.jqXHR<ProductTypeData[]> {
        return $.ajax({
                url: this.RouteFindProductTypeAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: null,
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindProductMasterAutoCompleteAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ProductListingMobileAppService/FindProductMasterAutoCompleteAsync`;
    public RouteFindProductMasterAutoCompleteAsync() : string {
        return this.ControllerUrl + "/"+"FindProductMasterAutoCompleteAsync";
    }
    public FindProductMasterAutoCompleteAsync(parameter: ProductMasterSearchCriteria): JQuery.jqXHR<ProductMasterData[]> {
        return $.ajax({
                url: this.RouteFindProductMasterAutoCompleteAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(parameter),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindOrderAutoCompleteAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ProductListingMobileAppService/FindOrderAutoCompleteAsync`;
    public RouteFindOrderAutoCompleteAsync() : string {
        return this.ControllerUrl + "/"+"FindOrderAutoCompleteAsync";
    }
    public FindOrderAutoCompleteAsync(parameter: ProductionListSearchCriteria): JQuery.jqXHR<OrderData[]> {
        return $.ajax({
                url: this.RouteFindOrderAutoCompleteAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(parameter),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteLoadAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ProductListingMobileAppService/LoadAsync`;
    public RouteLoadAsync() : string {
        return this.ControllerUrl + "/"+"LoadAsync";
    }
    public LoadAsync(scanQRCriteria: ScanQRCriteria): JQuery.jqXHR<ProductData> {
        return $.ajax({
                url: this.RouteLoadAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(scanQRCriteria),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteProductionSaveAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ProductListingMobileAppService/ProductionSaveAsync`;
    public RouteProductionSaveAsync() : string {
        return this.ControllerUrl + "/"+"ProductionSaveAsync";
    }
    public ProductionSaveAsync(productionCreateData: ProductionCreateData): JQuery.jqXHR<string> {
        return $.ajax({
                url: this.RouteProductionSaveAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(productionCreateData),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/?qrId=${encodeURIComponent(qrId)}
    //public static RouteScanQr = (qrId: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/ProductListingMobileAppService/ScanQr`;
    public RouteScanQr(qrId: string) : string {
        return this.ControllerUrl + "/"+"ScanQr";
    }
    public ScanQr(qrId: string): JQuery.jqXHR<boolean> {
        return $.ajax({
                url: this.RouteScanQr(qrId),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(qrId),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/?productionId=${encodeURIComponent(productionId)}
    //public static RouteFindByIdAsync = (productionId: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/ProductListingMobileAppService/FindByIdAsync`;
    public RouteFindByIdAsync(productionId: string) : string {
        return this.ControllerUrl + "/"+"FindByIdAsync";
    }
    public FindByIdAsync(productionId: string): JQuery.jqXHR<ProductionData> {
        return $.ajax({
                url: this.RouteFindByIdAsync(productionId),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(productionId),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteProductionUpdateAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ProductListingMobileAppService/ProductionUpdateAsync`;
    public RouteProductionUpdateAsync() : string {
        return this.ControllerUrl + "/"+"ProductionUpdateAsync";
    }
    public ProductionUpdateAsync(productionCreateData: ProductionCreateData): JQuery.jqXHR<string> {
        return $.ajax({
                url: this.RouteProductionUpdateAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(productionCreateData),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
}

export default ProductListingMobileAppService;



