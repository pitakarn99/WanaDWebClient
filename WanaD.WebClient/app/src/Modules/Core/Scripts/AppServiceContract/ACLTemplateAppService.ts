
 



 
 import {fs} from "Config/FsConfig";
 
    import ACLTemplateSearchParameter from 'Modules/Core/Scripts/AppServiceContract/ACLTemplateSearchParameter';

    import ACLTemplateCategoryData from 'Modules/Core/Scripts/ACLTemplateCategoryData';

    import ACLTemplateUpdateParameter from 'Modules/Core/Scripts/ACLTemplateUpdateParameter';

    import ResourceData from 'Modules/Core/Scripts/ResourceData';

    import ModuleData from 'Modules/Core/Scripts/AppServiceContract/ModuleData';


    class ACLTemplateAppService {

    ControllerUrl : string
    Options : JQueryAjaxSettings

    constructor(serverBaseUrl : string = null, controllerPath : string = null, ajaxOptions : JQueryAjaxSettings = null){
        this.ControllerUrl = ((serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : serverBaseUrl) + ((controllerPath == null) ?  "modules/Core.AppService/ACLTemplateAppService" : controllerPath);
        this.Options = ajaxOptions;
    }

    public Init(options : any = { serverBaseUrl :  null, controllerPath : null, ajaxOptions : null }){
        this.ControllerUrl = ((options.serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : options.serverBaseUrl) + ((options.controllerPath == null) ?  "modules/Core.AppService/ACLTemplateAppService" : options.controllerPath);
        this.Options = options.ajaxOptions;

        return this;
    }

    
    // post: api/${controller}/
    public RouteFindTemplateAsync() : string {
        return this.ControllerUrl + "/"+"FindTemplateAsync";
    }
    public FindTemplateAsync(parameter: ACLTemplateSearchParameter): JQuery.jqXHR<ACLTemplateCategoryData[]> {
        return $.ajax({
                url: this.RouteFindTemplateAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(parameter),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async
                });
    }                
    
    // post: api/${controller}/
    public RouteSaveTemplateAsync() : string {
        return this.ControllerUrl + "/"+"SaveTemplateAsync";
    }
    public SaveTemplateAsync(parameter: ACLTemplateUpdateParameter): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteSaveTemplateAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(parameter),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async
                });
    }                
    
    // post: api/${controller}/?applicationCode=${encodeURIComponent(applicationCode)}
    public RouteLoadResourceAsync(applicationCode: string) : string {
        return this.ControllerUrl + "/"+"LoadResourceAsync";
    }
    public LoadResourceAsync(applicationCode: string): JQuery.jqXHR<ResourceData[]> {
        return $.ajax({
                url: this.RouteLoadResourceAsync(applicationCode),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(applicationCode),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async
                });
    }                
    
    // post: api/${controller}/
    public RouteLoadModuleListAsync() : string {
        return this.ControllerUrl + "/"+"LoadModuleListAsync";
    }
    public LoadModuleListAsync(): JQuery.jqXHR<ModuleData[]> {
        return $.ajax({
                url: this.RouteLoadModuleListAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: null,
                async: this.Options == null || this.Options.async == null ? true : this.Options.async
                });
    }                
    
}

export default ACLTemplateAppService;



