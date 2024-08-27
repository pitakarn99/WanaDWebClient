
 



 
 import {fs} from "Config/FsConfig";
 import { FsAjaxSettings } from "../../../../Lib/Fs.Core.Aurelia/Components/FsAjaxSettings";
 

 
 
    import GenerateCodeParameter from 'Modules/WanaD/Scripts/AppServiceContract/GenerateCodeParameter';

    import GenerateCodeData from 'Modules/WanaD/Scripts/AppServiceContract/GenerateCodeData';

    import GenerateCodeSearchCriteria from 'Modules/WanaD/Scripts/AppServiceContract/GenerateCodeSearchCriteria';

    import GenerateCodeRequest from 'Modules/WanaD/Scripts/AppServiceContract/GenerateCodeRequest';

    import QRData from 'Modules/WanaD/Scripts/AppServiceContract/QRData';

    import FactoryAndFarmData from 'Modules/WanaD/Scripts/AppServiceContract/FactoryAndFarmData';


    //module GenerateCodeAppService {
    

    class GenerateCodeAppService {

    ControllerUrl : string
    Options : FsAjaxSettings

    constructor(serverBaseUrl : string = null, controllerPath : string = null, ajaxOptions : FsAjaxSettings = null){
        this.ControllerUrl = ((serverBaseUrl == null || serverBaseUrl == "") ? fs.Config.ServiceBaseUrl : serverBaseUrl) + ((controllerPath == null || controllerPath == "") ?  "modules/WanaD.AppService/GenerateCodeAppService" : controllerPath);
        this.Options = ajaxOptions;
    }

    public Init(options : any = { serverBaseUrl :  null, controllerPath : null, ajaxOptions : null }){
        this.ControllerUrl = ((options.serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : options.serverBaseUrl) + ((options.controllerPath == null) ?  "modules/WanaD.AppService/GenerateCodeAppService" : options.controllerPath);
        this.Options = options.ajaxOptions;

        return this;
    }

    
    // post: api/${controller}/
    //public static RouteFindAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/GenerateCodeAppService/FindAsync`;
    public RouteFindAsync() : string {
        return this.ControllerUrl + "/"+"FindAsync";
    }
    public FindAsync(parameter: GenerateCodeParameter): JQuery.jqXHR<GenerateCodeData[]> {
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
    //public static RouteCount = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/GenerateCodeAppService/Count`;
    public RouteCount() : string {
        return this.ControllerUrl + "/"+"Count";
    }
    public Count(criteria: GenerateCodeSearchCriteria): JQuery.jqXHR<number> {
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
    //public static RouteAddAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/GenerateCodeAppService/AddAsync`;
    public RouteAddAsync() : string {
        return this.ControllerUrl + "/"+"AddAsync";
    }
    public AddAsync(request: GenerateCodeRequest): JQuery.jqXHR<string> {
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
    //public static RouteLoadAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/GenerateCodeAppService/LoadAsync`;
    public RouteLoadAsync() : string {
        return this.ControllerUrl + "/"+"LoadAsync";
    }
    public LoadAsync(criteria: GenerateCodeSearchCriteria): JQuery.jqXHR<GenerateCodeData> {
        return $.ajax({
                url: this.RouteLoadAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(criteria),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindQRAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/GenerateCodeAppService/FindQRAsync`;
    public RouteFindQRAsync() : string {
        return this.ControllerUrl + "/"+"FindQRAsync";
    }
    public FindQRAsync(parameter: GenerateCodeParameter): JQuery.jqXHR<QRData[]> {
        return $.ajax({
                url: this.RouteFindQRAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(parameter),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteQRCount = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/GenerateCodeAppService/QRCount`;
    public RouteQRCount() : string {
        return this.ControllerUrl + "/"+"QRCount";
    }
    public QRCount(criteria: GenerateCodeSearchCriteria): JQuery.jqXHR<number> {
        return $.ajax({
                url: this.RouteQRCount(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(criteria),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindBrandAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/GenerateCodeAppService/FindBrandAsync`;
    public RouteFindBrandAsync() : string {
        return this.ControllerUrl + "/"+"FindBrandAsync";
    }
    public FindBrandAsync(criteria: GenerateCodeSearchCriteria): JQuery.jqXHR<FactoryAndFarmData[]> {
        return $.ajax({
                url: this.RouteFindBrandAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(criteria),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
}

export default GenerateCodeAppService;



