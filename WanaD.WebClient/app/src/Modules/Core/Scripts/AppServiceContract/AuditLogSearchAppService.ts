
 



 
 import {fs} from "Config/FsConfig";
 
    import AuditLogSearchParameter from 'Modules/Core/Scripts/AppServiceContract/AuditLogSearchParameter';

    import AuditLogSearchData from 'Modules/Core/Scripts/AppServiceContract/AuditLogSearchData';

    import AuditLogCategoryData01 from 'Modules/Core/Scripts/AppServiceContract/AuditLogCategoryData01';

    import AuditLogSearchCriteria from 'Modules/Core/Scripts/AuditLogSearchCriteria';


    class AuditLogSearchAppService {

    ControllerUrl : string
    Options : JQueryAjaxSettings

    constructor(serverBaseUrl : string = null, controllerPath : string = null, ajaxOptions : JQueryAjaxSettings = null){
        this.ControllerUrl = ((serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : serverBaseUrl) + ((controllerPath == null) ?  "modules/Core.AppService/AuditLogSearchAppService" : controllerPath);
        this.Options = ajaxOptions;
    }

    public Init(options : any = { serverBaseUrl :  null, controllerPath : null, ajaxOptions : null }){
        this.ControllerUrl = ((options.serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : options.serverBaseUrl) + ((options.controllerPath == null) ?  "modules/Core.AppService/AuditLogSearchAppService" : options.controllerPath);
        this.Options = options.ajaxOptions;

        return this;
    }

    
    // post: api/${controller}/
    public RouteFindAsync() : string {
        return this.ControllerUrl + "/"+"FindAsync";
    }
    public FindAsync(parameter: AuditLogSearchParameter): JQuery.jqXHR<AuditLogSearchData[]> {
        return $.ajax({
                url: this.RouteFindAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(parameter),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async
                });
    }                
    
    // post: api/${controller}/
    public RouteFindAuditLogCategoryDropdownAsync() : string {
        return this.ControllerUrl + "/"+"FindAuditLogCategoryDropdownAsync";
    }
    public FindAuditLogCategoryDropdownAsync(): JQuery.jqXHR<AuditLogCategoryData01[]> {
        return $.ajax({
                url: this.RouteFindAuditLogCategoryDropdownAsync(),
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
    public CountAsync(criteria: AuditLogSearchCriteria): JQuery.jqXHR<number> {
        return $.ajax({
                url: this.RouteCountAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(criteria),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async
                });
    }                
    
}

export default AuditLogSearchAppService;



