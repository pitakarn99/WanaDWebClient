
 



 
 import {fs} from "Config/FsConfig";
 import { FsAjaxSettings } from "../../../../Lib/Fs.Core.Aurelia/Components/FsAjaxSettings";
 

 
 
    import ProductParameter from 'Modules/WanaD/Scripts/AppServiceContract/ProductParameter';

    import ProductData from 'Modules/WanaD/Scripts/AppServiceContract/ProductData';

    import ProductSearchCriteria from 'Modules/WanaD/Scripts/AppServiceContract/ProductSearchCriteria';

    import PlotData from 'Modules/WanaD/Scripts/AppServiceContract/PlotData';

    import TeaTypeData from 'Modules/WanaD/Scripts/AppServiceContract/TeaTypeData';


    //module ProductMobileAppService {
    

    class ProductMobileAppService {

    ControllerUrl : string
    Options : FsAjaxSettings

    constructor(serverBaseUrl : string = null, controllerPath : string = null, ajaxOptions : FsAjaxSettings = null){
        this.ControllerUrl = ((serverBaseUrl == null || serverBaseUrl == "") ? fs.Config.ServiceBaseUrl : serverBaseUrl) + ((controllerPath == null || controllerPath == "") ?  "modules/WanaD.AppService/ProductMobileAppService" : controllerPath);
        this.Options = ajaxOptions;
    }

    public Init(options : any = { serverBaseUrl :  null, controllerPath : null, ajaxOptions : null }){
        this.ControllerUrl = ((options.serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : options.serverBaseUrl) + ((options.controllerPath == null) ?  "modules/WanaD.AppService/ProductMobileAppService" : options.controllerPath);
        this.Options = options.ajaxOptions;

        return this;
    }

    
    // post: api/${controller}/
    //public static RouteFindAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ProductMobileAppService/FindAsync`;
    public RouteFindAsync() : string {
        return this.ControllerUrl + "/"+"FindAsync";
    }
    public FindAsync(parameter: ProductParameter): JQuery.jqXHR<ProductData[]> {
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
    //public static RouteCount = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ProductMobileAppService/Count`;
    public RouteCount() : string {
        return this.ControllerUrl + "/"+"Count";
    }
    public Count(criteria: ProductSearchCriteria): JQuery.jqXHR<number> {
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
    
    // post: api/${controller}/?qrId=${encodeURIComponent(qrId)}
    //public static RouteScanQr = (qrId: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/ProductMobileAppService/ScanQr`;
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
    
    // post: api/${controller}/
    //public static RouteAddAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ProductMobileAppService/AddAsync`;
    public RouteAddAsync() : string {
        return this.ControllerUrl + "/"+"AddAsync";
    }
    public AddAsync(request: ProductData): JQuery.jqXHR<string> {
        return $.ajax({
                url: this.RouteAddAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(request),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteUpdateAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ProductMobileAppService/UpdateAsync`;
    public RouteUpdateAsync() : string {
        return this.ControllerUrl + "/"+"UpdateAsync";
    }
    public UpdateAsync(request: ProductData): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteUpdateAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(request),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/${encodeURIComponent(id)}
    //public static RouteLoadAsync = (id: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/ProductMobileAppService/LoadAsync`;
    public RouteLoadAsync(id: string) : string {
        return this.ControllerUrl + "/"+"LoadAsync";
    }
    public LoadAsync(id: string): JQuery.jqXHR<ProductData> {
        return $.ajax({
                url: this.RouteLoadAsync(id),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(id),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindListPlotAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ProductMobileAppService/FindListPlotAsync`;
    public RouteFindListPlotAsync() : string {
        return this.ControllerUrl + "/"+"FindListPlotAsync";
    }
    public FindListPlotAsync(): JQuery.jqXHR<PlotData[]> {
        return $.ajax({
                url: this.RouteFindListPlotAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: null,
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindListTeaTypeAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ProductMobileAppService/FindListTeaTypeAsync`;
    public RouteFindListTeaTypeAsync() : string {
        return this.ControllerUrl + "/"+"FindListTeaTypeAsync";
    }
    public FindListTeaTypeAsync(): JQuery.jqXHR<TeaTypeData[]> {
        return $.ajax({
                url: this.RouteFindListTeaTypeAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: null,
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
}

export default ProductMobileAppService;



