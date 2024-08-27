
 



 
 import {fs} from "Config/FsConfig";
 
    import SendActivateEmailData from 'Modules/Core/Scripts/AppServiceContract/SendActivateEmailData';

    import ActivateTokenRequest from 'Modules/Core/Scripts/AppServiceContract/ActivateTokenRequest';

    import ActivateData from 'Modules/Core/Scripts/AppServiceContract/ActivateData';

    import CreatePasswordData from 'Modules/Core/Scripts/AppServiceContract/CreatePasswordData';


    class ActivateUserAppService {

    ControllerUrl : string
    Options : JQueryAjaxSettings

    constructor(serverBaseUrl : string = null, controllerPath : string = null, ajaxOptions : JQueryAjaxSettings = null){
        this.ControllerUrl = ((serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : serverBaseUrl) + ((controllerPath == null) ?  "modules/Core.AppService/ActivateUserAppService" : controllerPath);
        this.Options = ajaxOptions;
    }

    public Init(options : any = { serverBaseUrl :  null, controllerPath : null, ajaxOptions : null }){
        this.ControllerUrl = ((options.serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : options.serverBaseUrl) + ((options.controllerPath == null) ?  "modules/Core.AppService/ActivateUserAppService" : options.controllerPath);
        this.Options = options.ajaxOptions;

        return this;
    }

    
    // post: api/${controller}/
    public RouteSendActivateEmailAsync() : string {
        return this.ControllerUrl + "/"+"SendActivateEmailAsync";
    }
    public SendActivateEmailAsync(data: SendActivateEmailData): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteSendActivateEmailAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(data),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async
                });
    }                
    
    // post: api/${controller}/
    public RouteCheckTokenAsync() : string {
        return this.ControllerUrl + "/"+"CheckTokenAsync";
    }
    public CheckTokenAsync(data: ActivateTokenRequest): JQuery.jqXHR<boolean> {
        return $.ajax({
                url: this.RouteCheckTokenAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(data),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async
                });
    }                
    
    // post: api/${controller}/
    public RouteActivateUserAsync() : string {
        return this.ControllerUrl + "/"+"ActivateUserAsync";
    }
    public ActivateUserAsync(data: ActivateData): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteActivateUserAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(data),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async
                });
    }                
    
    // post: api/${controller}/
    public RouteCreatePasswordAsync() : string {
        return this.ControllerUrl + "/"+"CreatePasswordAsync";
    }
    public CreatePasswordAsync(data: CreatePasswordData): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteCreatePasswordAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(data),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async
                });
    }                
    
}

export default ActivateUserAppService;



