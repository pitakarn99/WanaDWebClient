
 



 
 import {fs} from "Config/FsConfig";
 
    import ConfigurationSearchParameter from 'Modules/Core/Scripts/AppServiceContract/ConfigurationSearchParameter';

    import ConfigurationData from 'Modules/Core/Scripts/AppServiceContract/ConfigurationData';

    import ConfigurationItemCategoryData from 'Modules/Core/Scripts/AppServiceContract/ConfigurationItemCategoryData';

    import ConfigurationItemCategorySearchCriteria from 'Modules/Core/Scripts/AppServiceContract/ConfigurationItemCategorySearchCriteria';

    import ConfigurationRequest from 'Modules/Core/Scripts/AppServiceContract/ConfigurationRequest';


    class ConfigurationAppService {

    ControllerUrl : string
    Options : JQueryAjaxSettings

    constructor(serverBaseUrl : string = null, controllerPath : string = null, ajaxOptions : JQueryAjaxSettings = null){
        this.ControllerUrl = ((serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : serverBaseUrl) + ((controllerPath == null) ?  "modules/Core.AppService/ConfigurationAppService" : controllerPath);
        this.Options = ajaxOptions;
    }

    public Init(options : any = { serverBaseUrl :  null, controllerPath : null, ajaxOptions : null }){
        this.ControllerUrl = ((options.serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : options.serverBaseUrl) + ((options.controllerPath == null) ?  "modules/Core.AppService/ConfigurationAppService" : options.controllerPath);
        this.Options = options.ajaxOptions;

        return this;
    }

    
    // post: api/${controller}/
    public RouteFindAsync() : string {
        return this.ControllerUrl + "/"+"FindAsync";
    }
    public FindAsync(configurationSearchParameter: ConfigurationSearchParameter): JQuery.jqXHR<ConfigurationData[]> {
        return $.ajax({
                url: this.RouteFindAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(configurationSearchParameter),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async
                });
    }                
    
    // post: api/${controller}/
    public RouteFindCategoryDataAsync() : string {
        return this.ControllerUrl + "/"+"FindCategoryDataAsync";
    }
    public FindCategoryDataAsync(): JQuery.jqXHR<ConfigurationItemCategoryData[]> {
        return $.ajax({
                url: this.RouteFindCategoryDataAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: null,
                async: this.Options == null || this.Options.async == null ? true : this.Options.async
                });
    }                
    
    // post: api/${controller}/
    public RouteCountAsync() : string {
        return this.ControllerUrl + "/"+"CountAsync";
    }
    public CountAsync(searchCriteria: ConfigurationItemCategorySearchCriteria): JQuery.jqXHR<number> {
        return $.ajax({
                url: this.RouteCountAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(searchCriteria),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async
                });
    }                
    
    // post: api/${controller}/
    public RouteUpdateAsync() : string {
        return this.ControllerUrl + "/"+"UpdateAsync";
    }
    public UpdateAsync(configurationItemCategoryRequest: ConfigurationRequest): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteUpdateAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(configurationItemCategoryRequest),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async
                });
    }                
    
}

export default ConfigurationAppService;



