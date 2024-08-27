
 



 
 import {fs} from "Config/FsConfig";
 
    import MenuParameter from 'Modules/Core/Scripts/AppServiceContract/MenuParameter';

    import MenuData from 'Modules/Core/Scripts/AppServiceContract/MenuData';

    import MenuParameter2 from 'Modules/Core/Scripts/AppServiceContract/MenuParameter2';

    import UserProfile from 'Modules/Core/Scripts/UserProfile';


    class MenuAppService {

    ControllerUrl : string
    Options : JQueryAjaxSettings

    constructor(serverBaseUrl : string = null, controllerPath : string = null, ajaxOptions : JQueryAjaxSettings = null){
        this.ControllerUrl = ((serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : serverBaseUrl) + ((controllerPath == null) ?  "modules/Core.AppService/MenuAppService" : controllerPath);
        this.Options = ajaxOptions;
    }

    public Init(options : any = { serverBaseUrl :  null, controllerPath : null, ajaxOptions : null }){
        this.ControllerUrl = ((options.serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : options.serverBaseUrl) + ((options.controllerPath == null) ?  "modules/Core.AppService/MenuAppService" : options.controllerPath);
        this.Options = options.ajaxOptions;

        return this;
    }

    
    // post: api/${controller}/
    public RouteGenerateMenuAsync() : string {
        return this.ControllerUrl + "/"+"GenerateMenuAsync";
    }
    public GenerateMenuAsync(menuParameter: MenuParameter): JQuery.jqXHR<MenuData[]> {
        return $.ajax({
                url: this.RouteGenerateMenuAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(menuParameter),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async
                });
    }                
    
    // post: api/${controller}/
    public RouteGenerateMenuAsync2() : string {
        return this.ControllerUrl + "/"+"GenerateMenuAsync2";
    }
    public GenerateMenuAsync2(menuParameter: MenuParameter2): JQuery.jqXHR<MenuData[]> {
        return $.ajax({
                url: this.RouteGenerateMenuAsync2(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(menuParameter),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async
                });
    }                
    
    // post: api/${controller}/
    public RouteGenerateMenuAsync3() : string {
        return this.ControllerUrl + "/"+"GenerateMenuAsync3";
    }
    public GenerateMenuAsync3(menuParameter: MenuParameter): JQuery.jqXHR<MenuData[]> {
        return $.ajax({
                url: this.RouteGenerateMenuAsync3(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(menuParameter),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async
                });
    }                
    
    // post: api/${controller}/
    public RouteRetrieveUserProfileAsync() : string {
        return this.ControllerUrl + "/"+"RetrieveUserProfileAsync";
    }
    public RetrieveUserProfileAsync(): JQuery.jqXHR<UserProfile> {
        return $.ajax({
                url: this.RouteRetrieveUserProfileAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: null,
                async: this.Options == null || this.Options.async == null ? true : this.Options.async
                });
    }                
    
}

export default MenuAppService;



