
 



 
 import {fs} from "Config/FsConfig";
 import { FsAjaxSettings } from "../../../../Lib/Fs.Core.Aurelia/Components/FsAjaxSettings";
 

 
 
    import PackingListParameter from 'Modules/WanaD/Scripts/AppServiceContract/PackingListParameter';

    import PackingListData from 'Modules/WanaD/Scripts/AppServiceContract/PackingListData';

    import PackingListSearchCriteria from 'Modules/WanaD/Scripts/AppServiceContract/PackingListSearchCriteria';

    import ProductTypeData from 'Modules/WanaD/Scripts/AppServiceContract/ProductTypeData';

    import ProductMasterSearchCriteria from 'Modules/WanaD/Scripts/AppServiceContract/ProductMasterSearchCriteria';

    import ProductMasterData from 'Modules/WanaD/Scripts/AppServiceContract/ProductMasterData';

    import ScanQRCriteria from 'Modules/WanaD/Scripts/AppServiceContract/ScanQRCriteria';

    import ProductData from 'Modules/WanaD/Scripts/AppServiceContract/ProductData';

    import PackingCreateData from 'Modules/WanaD/Scripts/AppServiceContract/PackingCreateData';

    import PackingData from 'Modules/WanaD/Scripts/AppServiceContract/PackingData';


    //module PackingMobileAppService {
    

    class PackingMobileAppService {

    ControllerUrl : string
    Options : FsAjaxSettings

    constructor(serverBaseUrl : string = null, controllerPath : string = null, ajaxOptions : FsAjaxSettings = null){
        this.ControllerUrl = ((serverBaseUrl == null || serverBaseUrl == "") ? fs.Config.ServiceBaseUrl : serverBaseUrl) + ((controllerPath == null || controllerPath == "") ?  "modules/WanaD.AppService/PackingMobileAppService" : controllerPath);
        this.Options = ajaxOptions;
    }

    public Init(options : any = { serverBaseUrl :  null, controllerPath : null, ajaxOptions : null }){
        this.ControllerUrl = ((options.serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : options.serverBaseUrl) + ((options.controllerPath == null) ?  "modules/WanaD.AppService/PackingMobileAppService" : options.controllerPath);
        this.Options = options.ajaxOptions;

        return this;
    }

    
    // post: api/${controller}/
    //public static RouteFindAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/PackingMobileAppService/FindAsync`;
    public RouteFindAsync() : string {
        return this.ControllerUrl + "/"+"FindAsync";
    }
    public FindAsync(parameter: PackingListParameter): JQuery.jqXHR<PackingListData[]> {
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
    //public static RouteCount = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/PackingMobileAppService/Count`;
    public RouteCount() : string {
        return this.ControllerUrl + "/"+"Count";
    }
    public Count(criteria: PackingListSearchCriteria): JQuery.jqXHR<number> {
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
    //public static RouteFindProductTypeAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/PackingMobileAppService/FindProductTypeAsync`;
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
    //public static RouteFindProductMasterAutoCompleteAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/PackingMobileAppService/FindProductMasterAutoCompleteAsync`;
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
    //public static RouteLoadAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/PackingMobileAppService/LoadAsync`;
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
    
    // post: api/${controller}/?qrId=${encodeURIComponent(qrId)}
    //public static RouteScanQr = (qrId: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/PackingMobileAppService/ScanQr`;
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
    
    // post: api/${controller}/?productMasterId=${encodeURIComponent(productMasterId)}
    //public static RouteFindProductMasterByIdAsync = (productMasterId: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/PackingMobileAppService/FindProductMasterByIdAsync`;
    public RouteFindProductMasterByIdAsync(productMasterId: string) : string {
        return this.ControllerUrl + "/"+"FindProductMasterByIdAsync";
    }
    public FindProductMasterByIdAsync(productMasterId: string): JQuery.jqXHR<ProductMasterData> {
        return $.ajax({
                url: this.RouteFindProductMasterByIdAsync(productMasterId),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(productMasterId),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RoutePackingSaveAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/PackingMobileAppService/PackingSaveAsync`;
    public RoutePackingSaveAsync() : string {
        return this.ControllerUrl + "/"+"PackingSaveAsync";
    }
    public PackingSaveAsync(packingCreateData: PackingCreateData): JQuery.jqXHR<string> {
        return $.ajax({
                url: this.RoutePackingSaveAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(packingCreateData),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/?productId=${encodeURIComponent(productId)}
    //public static RouteFindByIdAsync = (productId: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/PackingMobileAppService/FindByIdAsync`;
    public RouteFindByIdAsync(productId: string) : string {
        return this.ControllerUrl + "/"+"FindByIdAsync";
    }
    public FindByIdAsync(productId: string): JQuery.jqXHR<PackingData> {
        return $.ajax({
                url: this.RouteFindByIdAsync(productId),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(productId),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindProductAutoCompleteAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/PackingMobileAppService/FindProductAutoCompleteAsync`;
    public RouteFindProductAutoCompleteAsync() : string {
        return this.ControllerUrl + "/"+"FindProductAutoCompleteAsync";
    }
    public FindProductAutoCompleteAsync(parameter: ProductMasterSearchCriteria): JQuery.jqXHR<ProductMasterData[]> {
        return $.ajax({
                url: this.RouteFindProductAutoCompleteAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(parameter),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
}

export default PackingMobileAppService;



