
 



 
 import {fs} from "Config/FsConfig";
 import { FsAjaxSettings } from "../../../../Lib/Fs.Core.Aurelia/Components/FsAjaxSettings";
 

 
 
    import BiodiversityContractParameter from 'Modules/WanaD/Scripts/AppServiceContract/BiodiversityContractParameter';

    import BiodiversityContractData from 'Modules/WanaD/Scripts/AppServiceContract/BiodiversityContractData';

    import BiodiversityContractSearchCriteria from 'Modules/WanaD/Scripts/AppServiceContract/BiodiversityContractSearchCriteria';

    import BiodiversityContractFarmSearchCriteria from 'Modules/WanaD/Scripts/AppServiceContract/BiodiversityContractFarmSearchCriteria';

    import BiodiversityContractFarmData from 'Modules/WanaD/Scripts/AppServiceContract/BiodiversityContractFarmData';


    //module ManageBiodiversityContractAppService {
    

    class ManageBiodiversityContractAppService {

    ControllerUrl : string
    Options : FsAjaxSettings

    constructor(serverBaseUrl : string = null, controllerPath : string = null, ajaxOptions : FsAjaxSettings = null){
        this.ControllerUrl = ((serverBaseUrl == null || serverBaseUrl == "") ? fs.Config.ServiceBaseUrl : serverBaseUrl) + ((controllerPath == null || controllerPath == "") ?  "modules/WanaD.AppService/ManageBiodiversityContractAppService" : controllerPath);
        this.Options = ajaxOptions;
    }

    public Init(options : any = { serverBaseUrl :  null, controllerPath : null, ajaxOptions : null }){
        this.ControllerUrl = ((options.serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : options.serverBaseUrl) + ((options.controllerPath == null) ?  "modules/WanaD.AppService/ManageBiodiversityContractAppService" : options.controllerPath);
        this.Options = options.ajaxOptions;

        return this;
    }

    
    // post: api/${controller}/
    //public static RouteFindAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageBiodiversityContractAppService/FindAsync`;
    public RouteFindAsync() : string {
        return this.ControllerUrl + "/"+"FindAsync";
    }
    public FindAsync(parameter: BiodiversityContractParameter): JQuery.jqXHR<BiodiversityContractData[]> {
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
    //public static RouteCountAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageBiodiversityContractAppService/CountAsync`;
    public RouteCountAsync() : string {
        return this.ControllerUrl + "/"+"CountAsync";
    }
    public CountAsync(criteria: BiodiversityContractSearchCriteria): JQuery.jqXHR<number> {
        return $.ajax({
                url: this.RouteCountAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(criteria),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteAddAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageBiodiversityContractAppService/AddAsync`;
    public RouteAddAsync() : string {
        return this.ControllerUrl + "/"+"AddAsync";
    }
    public AddAsync(request: BiodiversityContractData): JQuery.jqXHR<string> {
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
    //public static RouteFindEvaluateAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageBiodiversityContractAppService/FindEvaluateAsync`;
    public RouteFindEvaluateAsync() : string {
        return this.ControllerUrl + "/"+"FindEvaluateAsync";
    }
    public FindEvaluateAsync(parameter: BiodiversityContractParameter): JQuery.jqXHR<BiodiversityContractData[]> {
        return $.ajax({
                url: this.RouteFindEvaluateAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(parameter),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteCountEvaluateAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageBiodiversityContractAppService/CountEvaluateAsync`;
    public RouteCountEvaluateAsync() : string {
        return this.ControllerUrl + "/"+"CountEvaluateAsync";
    }
    public CountEvaluateAsync(criteria: BiodiversityContractSearchCriteria): JQuery.jqXHR<number> {
        return $.ajax({
                url: this.RouteCountEvaluateAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(criteria),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindFarmAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageBiodiversityContractAppService/FindFarmAsync`;
    public RouteFindFarmAsync() : string {
        return this.ControllerUrl + "/"+"FindFarmAsync";
    }
    public FindFarmAsync(criteria: BiodiversityContractFarmSearchCriteria): JQuery.jqXHR<BiodiversityContractFarmData[]> {
        return $.ajax({
                url: this.RouteFindFarmAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(criteria),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/${encodeURIComponent(id)}
    //public static RouteCancelContract = (id: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageBiodiversityContractAppService/CancelContract`;
    public RouteCancelContract(id: string) : string {
        return this.ControllerUrl + "/"+"CancelContract";
    }
    public CancelContract(id: string): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteCancelContract(id),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(id),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteUpdateEvaluateAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageBiodiversityContractAppService/UpdateEvaluateAsync`;
    public RouteUpdateEvaluateAsync() : string {
        return this.ControllerUrl + "/"+"UpdateEvaluateAsync";
    }
    public UpdateEvaluateAsync(request: BiodiversityContractData): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteUpdateEvaluateAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(request),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteBackgroundJobBiodiversityContract = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageBiodiversityContractAppService/BackgroundJobBiodiversityContract`;
    public RouteBackgroundJobBiodiversityContract() : string {
        return this.ControllerUrl + "/"+"BackgroundJobBiodiversityContract";
    }
    public BackgroundJobBiodiversityContract(): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteBackgroundJobBiodiversityContract(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: null,
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
}

export default ManageBiodiversityContractAppService;



