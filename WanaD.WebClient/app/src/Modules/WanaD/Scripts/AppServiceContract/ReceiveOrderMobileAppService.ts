
 



 
 import {fs} from "Config/FsConfig";
 import { FsAjaxSettings } from "../../../../Lib/Fs.Core.Aurelia/Components/FsAjaxSettings";
 

 
 
    import ReceiveOrderParameter from 'Modules/WanaD/Scripts/AppServiceContract/ReceiveOrderParameter';

    import ReceiveOrderData from 'Modules/WanaD/Scripts/AppServiceContract/ReceiveOrderData';

    import ReceiveOrderSearchCriteria from 'Modules/WanaD/Scripts/AppServiceContract/ReceiveOrderSearchCriteria';

    import ReceiveOrderDetailData from 'Modules/WanaD/Scripts/AppServiceContract/ReceiveOrderDetailData';

    import ProductTypeData from 'Modules/WanaD/Scripts/AppServiceContract/ProductTypeData';

    import FactorySearchCriteria from 'Modules/WanaD/Scripts/AppServiceContract/FactorySearchCriteria';

    import FactoryData from 'Modules/WanaD/Scripts/AppServiceContract/FactoryData';

    import ProductMasterSearchCriteria from 'Modules/WanaD/Scripts/AppServiceContract/ProductMasterSearchCriteria';

    import ProductMasterData from 'Modules/WanaD/Scripts/AppServiceContract/ProductMasterData';


    //module ReceiveOrderMobileAppService {
    

    class ReceiveOrderMobileAppService {

    ControllerUrl : string
    Options : FsAjaxSettings

    constructor(serverBaseUrl : string = null, controllerPath : string = null, ajaxOptions : FsAjaxSettings = null){
        this.ControllerUrl = ((serverBaseUrl == null || serverBaseUrl == "") ? fs.Config.ServiceBaseUrl : serverBaseUrl) + ((controllerPath == null || controllerPath == "") ?  "modules/WanaD.AppService/ReceiveOrderMobileAppService" : controllerPath);
        this.Options = ajaxOptions;
    }

    public Init(options : any = { serverBaseUrl :  null, controllerPath : null, ajaxOptions : null }){
        this.ControllerUrl = ((options.serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : options.serverBaseUrl) + ((options.controllerPath == null) ?  "modules/WanaD.AppService/ReceiveOrderMobileAppService" : options.controllerPath);
        this.Options = options.ajaxOptions;

        return this;
    }

    
    // post: api/${controller}/
    //public static RouteFindAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ReceiveOrderMobileAppService/FindAsync`;
    public RouteFindAsync() : string {
        return this.ControllerUrl + "/"+"FindAsync";
    }
    public FindAsync(parameter: ReceiveOrderParameter): JQuery.jqXHR<ReceiveOrderData[]> {
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
    //public static RouteCount = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ReceiveOrderMobileAppService/Count`;
    public RouteCount() : string {
        return this.ControllerUrl + "/"+"Count";
    }
    public Count(criteria: ReceiveOrderSearchCriteria): JQuery.jqXHR<number> {
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
    
    // post: api/${controller}/?productId=${encodeURIComponent(productId)}
    //public static RouteFindByIdAsync = (productId: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/ReceiveOrderMobileAppService/FindByIdAsync`;
    public RouteFindByIdAsync(productId: string) : string {
        return this.ControllerUrl + "/"+"FindByIdAsync";
    }
    public FindByIdAsync(productId: string): JQuery.jqXHR<ReceiveOrderDetailData> {
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
    //public static RouteReceiveOrderUpdateAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ReceiveOrderMobileAppService/ReceiveOrderUpdateAsync`;
    public RouteReceiveOrderUpdateAsync() : string {
        return this.ControllerUrl + "/"+"ReceiveOrderUpdateAsync";
    }
    public ReceiveOrderUpdateAsync(updateData: ReceiveOrderDetailData): JQuery.jqXHR<string> {
        return $.ajax({
                url: this.RouteReceiveOrderUpdateAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(updateData),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindProductTypeAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ReceiveOrderMobileAppService/FindProductTypeAsync`;
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
    //public static RouteFindFactoryAutoCompleteAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ReceiveOrderMobileAppService/FindFactoryAutoCompleteAsync`;
    public RouteFindFactoryAutoCompleteAsync() : string {
        return this.ControllerUrl + "/"+"FindFactoryAutoCompleteAsync";
    }
    public FindFactoryAutoCompleteAsync(parameter: FactorySearchCriteria): JQuery.jqXHR<FactoryData[]> {
        return $.ajax({
                url: this.RouteFindFactoryAutoCompleteAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(parameter),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindProductMasterAutoCompleteAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ReceiveOrderMobileAppService/FindProductMasterAutoCompleteAsync`;
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
    
    // post: api/${controller}/?qrId=${encodeURIComponent(qrId)}
    //public static RouteScanQr = (qrId: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/ReceiveOrderMobileAppService/ScanQr`;
    public RouteScanQr(qrId: string) : string {
        return this.ControllerUrl + "/"+"ScanQr";
    }
    public ScanQr(qrId: string): JQuery.jqXHR<ReceiveOrderDetailData> {
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
    
}

export default ReceiveOrderMobileAppService;



