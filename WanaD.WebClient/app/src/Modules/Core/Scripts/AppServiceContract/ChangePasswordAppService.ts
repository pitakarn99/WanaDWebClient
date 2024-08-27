
 



 
 import {fs} from "Config/FsConfig";
 
    import ResetPasswordTokenRequest from 'Modules/Core/Scripts/AppServiceContract/ResetPasswordTokenRequest';

    import ChangePasswordUpdateRequest from 'Modules/Core/Scripts/AppServiceContract/ChangePasswordUpdateRequest';

    import ResetPasswordUpdateRequest from 'Modules/Core/Scripts/AppServiceContract/ResetPasswordUpdateRequest';

    import PasswordRequirementsDisplayData from 'Modules/Core/Scripts/AppServiceContract/PasswordRequirementsDisplayData';


    class ChangePasswordAppService {

    ControllerUrl : string
    Options : JQueryAjaxSettings

    constructor(serverBaseUrl : string = null, controllerPath : string = null, ajaxOptions : JQueryAjaxSettings = null){
        this.ControllerUrl = ((serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : serverBaseUrl) + ((controllerPath == null) ?  "modules/Core.AppService/ChangePasswordAppService" : controllerPath);
        this.Options = ajaxOptions;
    }

    public Init(options : any = { serverBaseUrl :  null, controllerPath : null, ajaxOptions : null }){
        this.ControllerUrl = ((options.serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : options.serverBaseUrl) + ((options.controllerPath == null) ?  "modules/Core.AppService/ChangePasswordAppService" : options.controllerPath);
        this.Options = options.ajaxOptions;

        return this;
    }

    
    // post: api/${controller}/?email=${encodeURIComponent(email)}
    public RouteSendForgetPasswordEmailAsync(email: string) : string {
        return this.ControllerUrl + "/"+"SendForgetPasswordEmailAsync";
    }
    public SendForgetPasswordEmailAsync(email: string): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteSendForgetPasswordEmailAsync(email),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(email),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async
                });
    }                
    
    // post: api/${controller}/
    public RouteCheckTokenAsync() : string {
        return this.ControllerUrl + "/"+"CheckTokenAsync";
    }
    public CheckTokenAsync(request: ResetPasswordTokenRequest): JQuery.jqXHR<boolean> {
        return $.ajax({
                url: this.RouteCheckTokenAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(request),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async
                });
    }                
    
    // post: api/${controller}/
    public RouteChangePasswordAsync() : string {
        return this.ControllerUrl + "/"+"ChangePasswordAsync";
    }
    public ChangePasswordAsync(request: ChangePasswordUpdateRequest): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteChangePasswordAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(request),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async
                });
    }                
    
    // post: api/${controller}/
    public RouteResetPasswordAsync() : string {
        return this.ControllerUrl + "/"+"ResetPasswordAsync";
    }
    public ResetPasswordAsync(request: ResetPasswordUpdateRequest): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteResetPasswordAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(request),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async
                });
    }                
    
    // post: api/${controller}/?userUID=${encodeURIComponent(userUID)}
    public RouteResetPasswordAdminAsync(userUID: string) : string {
        return this.ControllerUrl + "/"+"ResetPasswordAdminAsync";
    }
    public ResetPasswordAdminAsync(userUID: string): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteResetPasswordAdminAsync(userUID),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(userUID),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async
                });
    }                
    
    // post: api/${controller}/
    public RouteLoadPasswordRequirementsDataAsync() : string {
        return this.ControllerUrl + "/"+"LoadPasswordRequirementsDataAsync";
    }
    public LoadPasswordRequirementsDataAsync(): JQuery.jqXHR<PasswordRequirementsDisplayData> {
        return $.ajax({
                url: this.RouteLoadPasswordRequirementsDataAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: null,
                async: this.Options == null || this.Options.async == null ? true : this.Options.async
                });
    }                
    
}

export default ChangePasswordAppService;



