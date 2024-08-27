
 



 
 import {fs} from "Config/FsConfig";
 import { FsAjaxSettings } from "../../../../Lib/Fs.Core.Aurelia/Components/FsAjaxSettings";
 

 
 
    import ManageUserGroupMemberSearchParameter from 'Modules/WanaD/Scripts/AppServiceContract/ManageUserGroupMemberSearchParameter';

    import UserData01 from 'Modules/WanaD/Scripts/AppServiceContract/UserData01';

    import UserCriteria01 from 'Modules/Core/Scripts/UserCriteria01';

    import FirstLoginCreatePasswordRequest from 'Modules/WanaD/Scripts/AppServiceContract/FirstLoginCreatePasswordRequest';

    import FindUserByExternalIdRequest from 'Modules/WanaD/Scripts/AppServiceContract/FindUserByExternalIdRequest';

    import DeviceTokenData from 'Modules/WanaD/Scripts/AppServiceContract/DeviceTokenData';


    //module ManageUserAppService {
    

    class ManageUserAppService {

    ControllerUrl : string
    Options : FsAjaxSettings

    constructor(serverBaseUrl : string = null, controllerPath : string = null, ajaxOptions : FsAjaxSettings = null){
        this.ControllerUrl = ((serverBaseUrl == null || serverBaseUrl == "") ? fs.Config.ServiceBaseUrl : serverBaseUrl) + ((controllerPath == null || controllerPath == "") ?  "modules/WanaD.AppService/ManageUserAppService" : controllerPath);
        this.Options = ajaxOptions;
    }

    public Init(options : any = { serverBaseUrl :  null, controllerPath : null, ajaxOptions : null }){
        this.ControllerUrl = ((options.serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : options.serverBaseUrl) + ((options.controllerPath == null) ?  "modules/WanaD.AppService/ManageUserAppService" : options.controllerPath);
        this.Options = options.ajaxOptions;

        return this;
    }

    
    // post: api/${controller}/
    //public static RouteFindAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageUserAppService/FindAsync`;
    public RouteFindAsync() : string {
        return this.ControllerUrl + "/"+"FindAsync";
    }
    public FindAsync(parameter: ManageUserGroupMemberSearchParameter): JQuery.jqXHR<UserData01[]> {
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
    //public static RouteCountAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageUserAppService/CountAsync`;
    public RouteCountAsync() : string {
        return this.ControllerUrl + "/"+"CountAsync";
    }
    public CountAsync(criteria: UserCriteria01): JQuery.jqXHR<number> {
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
    
    // post: api/${controller}/?userUID=${encodeURIComponent(userUID)}
    //public static RouteRemoveAsync = (userUID: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageUserAppService/RemoveAsync`;
    public RouteRemoveAsync(userUID: string) : string {
        return this.ControllerUrl + "/"+"RemoveAsync";
    }
    public RemoveAsync(userUID: string): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteRemoveAsync(userUID),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(userUID),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/?userUID=${encodeURIComponent(userUID)}
    //public static RouteLoadAsync = (userUID: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageUserAppService/LoadAsync`;
    public RouteLoadAsync(userUID: string) : string {
        return this.ControllerUrl + "/"+"LoadAsync";
    }
    public LoadAsync(userUID: string): JQuery.jqXHR<UserData01> {
        return $.ajax({
                url: this.RouteLoadAsync(userUID),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(userUID),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteUpdateAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageUserAppService/UpdateAsync`;
    public RouteUpdateAsync() : string {
        return this.ControllerUrl + "/"+"UpdateAsync";
    }
    public UpdateAsync(request: UserData01): JQuery.jqXHR<void> {
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
    //public static RouteAddAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageUserAppService/AddAsync`;
    public RouteAddAsync() : string {
        return this.ControllerUrl + "/"+"AddAsync";
    }
    public AddAsync(request: UserData01): JQuery.jqXHR<string> {
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
    
    // post: api/${controller}/?externalLineId=${encodeURIComponent(externalLineId)}
    //public static RouteFirstLoginLineConnectAsync = (externalLineId: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageUserAppService/FirstLoginLineConnectAsync`;
    public RouteFirstLoginLineConnectAsync(externalLineId: string) : string {
        return this.ControllerUrl + "/"+"FirstLoginLineConnectAsync";
    }
    public FirstLoginLineConnectAsync(externalLineId: string): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteFirstLoginLineConnectAsync(externalLineId),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(externalLineId),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteAgreePrivacyAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageUserAppService/AgreePrivacyAsync`;
    public RouteAgreePrivacyAsync() : string {
        return this.ControllerUrl + "/"+"AgreePrivacyAsync";
    }
    public AgreePrivacyAsync(): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteAgreePrivacyAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: null,
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFirstLoginCreatePasswordAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageUserAppService/FirstLoginCreatePasswordAsync`;
    public RouteFirstLoginCreatePasswordAsync() : string {
        return this.ControllerUrl + "/"+"FirstLoginCreatePasswordAsync";
    }
    public FirstLoginCreatePasswordAsync(request: FirstLoginCreatePasswordRequest): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteFirstLoginCreatePasswordAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(request),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindUserByExternalIdAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageUserAppService/FindUserByExternalIdAsync`;
    public RouteFindUserByExternalIdAsync() : string {
        return this.ControllerUrl + "/"+"FindUserByExternalIdAsync";
    }
    public FindUserByExternalIdAsync(request: FindUserByExternalIdRequest): JQuery.jqXHR<UserData01> {
        return $.ajax({
                url: this.RouteFindUserByExternalIdAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(request),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteLoadCurrentUserProfileAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageUserAppService/LoadCurrentUserProfileAsync`;
    public RouteLoadCurrentUserProfileAsync() : string {
        return this.ControllerUrl + "/"+"LoadCurrentUserProfileAsync";
    }
    public LoadCurrentUserProfileAsync(): JQuery.jqXHR<UserData01> {
        return $.ajax({
                url: this.RouteLoadCurrentUserProfileAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: null,
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindInternalUserAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageUserAppService/FindInternalUserAsync`;
    public RouteFindInternalUserAsync() : string {
        return this.ControllerUrl + "/"+"FindInternalUserAsync";
    }
    public FindInternalUserAsync(parameter: ManageUserGroupMemberSearchParameter): JQuery.jqXHR<UserData01[]> {
        return $.ajax({
                url: this.RouteFindInternalUserAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(parameter),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteUpdateDeviceTokenAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageUserAppService/UpdateDeviceTokenAsync`;
    public RouteUpdateDeviceTokenAsync() : string {
        return this.ControllerUrl + "/"+"UpdateDeviceTokenAsync";
    }
    public UpdateDeviceTokenAsync(request: DeviceTokenData): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteUpdateDeviceTokenAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(request),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteRemoveDeviceTokenAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageUserAppService/RemoveDeviceTokenAsync`;
    public RouteRemoveDeviceTokenAsync() : string {
        return this.ControllerUrl + "/"+"RemoveDeviceTokenAsync";
    }
    public RemoveDeviceTokenAsync(request: DeviceTokenData): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteRemoveDeviceTokenAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(request),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/?mobilePhone=${encodeURIComponent(mobilePhone)}
    //public static RouteResetPasswordAsync = (mobilePhone: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageUserAppService/ResetPasswordAsync`;
    public RouteResetPasswordAsync(mobilePhone: string) : string {
        return this.ControllerUrl + "/"+"ResetPasswordAsync";
    }
    public ResetPasswordAsync(mobilePhone: string): JQuery.jqXHR<boolean> {
        return $.ajax({
                url: this.RouteResetPasswordAsync(mobilePhone),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(mobilePhone),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
}

export default ManageUserAppService;



