
 



 
 import {fs} from "Config/FsConfig";
 import { FsAjaxSettings } from "../../../../Lib/Fs.Core.Aurelia/Components/FsAjaxSettings";
 

 
 
    import PlotScoreParameter from 'Modules/WanaD/Scripts/AppServiceContract/PlotScoreParameter';

    import PlotScoreData from 'Modules/WanaD/Scripts/AppServiceContract/PlotScoreData';

    import PlotScoreSearchCriteria from 'Modules/WanaD/Scripts/AppServiceContract/PlotScoreSearchCriteria';

    import FarmAndPlotData from 'Modules/WanaD/Scripts/AppServiceContract/FarmAndPlotData';

    import FileInfoData from 'Modules/Core/Scripts/FileInfoData';


    //module PlotScoreAppService {
    

    class PlotScoreAppService {

    ControllerUrl : string
    Options : FsAjaxSettings

    constructor(serverBaseUrl : string = null, controllerPath : string = null, ajaxOptions : FsAjaxSettings = null){
        this.ControllerUrl = ((serverBaseUrl == null || serverBaseUrl == "") ? fs.Config.ServiceBaseUrl : serverBaseUrl) + ((controllerPath == null || controllerPath == "") ?  "modules/WanaD.AppService/PlotScoreAppService" : controllerPath);
        this.Options = ajaxOptions;
    }

    public Init(options : any = { serverBaseUrl :  null, controllerPath : null, ajaxOptions : null }){
        this.ControllerUrl = ((options.serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : options.serverBaseUrl) + ((options.controllerPath == null) ?  "modules/WanaD.AppService/PlotScoreAppService" : options.controllerPath);
        this.Options = options.ajaxOptions;

        return this;
    }

    
    // post: api/${controller}/
    //public static RouteFindAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/PlotScoreAppService/FindAsync`;
    public RouteFindAsync() : string {
        return this.ControllerUrl + "/"+"FindAsync";
    }
    public FindAsync(parameter: PlotScoreParameter): JQuery.jqXHR<PlotScoreData[]> {
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
    //public static RouteCountAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/PlotScoreAppService/CountAsync`;
    public RouteCountAsync() : string {
        return this.ControllerUrl + "/"+"CountAsync";
    }
    public CountAsync(criteria: PlotScoreSearchCriteria): JQuery.jqXHR<number> {
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
    //public static RouteUpdateAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/PlotScoreAppService/UpdateAsync`;
    public RouteUpdateAsync() : string {
        return this.ControllerUrl + "/"+"UpdateAsync";
    }
    public UpdateAsync(request: PlotScoreData): JQuery.jqXHR<void> {
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
    
    // post: api/${controller}/
    //public static RouteFindFarmAsync = (name: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/PlotScoreAppService/FindFarmAsync`;
    public RouteFindFarmAsync(name: string) : string {
        return this.ControllerUrl + "/"+"FindFarmAsync";
    }
    public FindFarmAsync(name: string): JQuery.jqXHR<FarmAndPlotData[]> {
        return $.ajax({
                url: this.RouteFindFarmAsync(name),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(name),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/${encodeURIComponent(id)}
    //public static RouteFileInfoData = (id: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/PlotScoreAppService/FileInfoData`;
    public RouteFileInfoData(id: string) : string {
        return this.ControllerUrl + "/"+"FileInfoData";
    }
    public FileInfoData(id: string): JQuery.jqXHR<FileInfoData[]> {
        return $.ajax({
                url: this.RouteFileInfoData(id),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(id),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
}

export default PlotScoreAppService;



