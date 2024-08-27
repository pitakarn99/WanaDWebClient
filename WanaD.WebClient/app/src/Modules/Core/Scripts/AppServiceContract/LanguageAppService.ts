
 



 
 import {fs} from "Config/FsConfig";
 
    import LanguageData from 'Modules/Core/Scripts/AppServiceContract/LanguageData';


    class LanguageAppService {

    ControllerUrl : string
    Options : JQueryAjaxSettings

    constructor(serverBaseUrl : string = null, controllerPath : string = null, ajaxOptions : JQueryAjaxSettings = null){
        this.ControllerUrl = ((serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : serverBaseUrl) + ((controllerPath == null) ?  "modules/Core.AppService/LanguageAppService" : controllerPath);
        this.Options = ajaxOptions;
    }

    public Init(options : any = { serverBaseUrl :  null, controllerPath : null, ajaxOptions : null }){
        this.ControllerUrl = ((options.serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : options.serverBaseUrl) + ((options.controllerPath == null) ?  "modules/Core.AppService/LanguageAppService" : options.controllerPath);
        this.Options = options.ajaxOptions;

        return this;
    }

    
    // post: api/${controller}/
    public RouteFindAllLanguageAsync() : string {
        return this.ControllerUrl + "/"+"FindAllLanguageAsync";
    }
    public FindAllLanguageAsync(): JQuery.jqXHR<LanguageData[]> {
        return $.ajax({
                url: this.RouteFindAllLanguageAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: null,
                async: this.Options == null || this.Options.async == null ? true : this.Options.async
                });
    }                
    
    // post: api/${controller}/
    public RouteFindAllLanguageWithOutDefaultLanguageAsync() : string {
        return this.ControllerUrl + "/"+"FindAllLanguageWithOutDefaultLanguageAsync";
    }
    public FindAllLanguageWithOutDefaultLanguageAsync(): JQuery.jqXHR<LanguageData[]> {
        return $.ajax({
                url: this.RouteFindAllLanguageWithOutDefaultLanguageAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: null,
                async: this.Options == null || this.Options.async == null ? true : this.Options.async
                });
    }                
    
}

export default LanguageAppService;



