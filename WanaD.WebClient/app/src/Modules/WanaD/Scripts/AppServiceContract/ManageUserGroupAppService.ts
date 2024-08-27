
 



 
 import {fs} from "Config/FsConfig";
 import { FsAjaxSettings } from "../../../../Lib/Fs.Core.Aurelia/Components/FsAjaxSettings";
 

 
 
    import ManageUserGroupMemberSearchParameter from 'Modules/Core/Scripts/AppServiceContract/ManageUserGroupMemberSearchParameter';

    import UserData01 from 'Modules/Core/Scripts/AppServiceContract/UserData01';

    import UserCriteria01 from 'Modules/Core/Scripts/UserCriteria01';

    import GroupUpdateRequest from 'Modules/Core/Scripts/AppServiceContract/GroupUpdateRequest';

    import MemberUpdateRequest from 'Modules/Core/Scripts/AppServiceContract/MemberUpdateRequest';

    import MemberData01 from 'Modules/Core/Scripts/AppServiceContract/MemberData01';

    import UserProfile from 'Modules/Core/Scripts/UserProfile';


    //module ManageUserGroupAppService {
    

    class ManageUserGroupAppService {

    ControllerUrl : string
    Options : FsAjaxSettings

    constructor(serverBaseUrl : string = null, controllerPath : string = null, ajaxOptions : FsAjaxSettings = null){
        this.ControllerUrl = ((serverBaseUrl == null || serverBaseUrl == "") ? fs.Config.ServiceBaseUrl : serverBaseUrl) + ((controllerPath == null || controllerPath == "") ?  "modules/WanaD.AppService/ManageUserGroupAppService" : controllerPath);
        this.Options = ajaxOptions;
    }

    public Init(options : any = { serverBaseUrl :  null, controllerPath : null, ajaxOptions : null }){
        this.ControllerUrl = ((options.serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : options.serverBaseUrl) + ((options.controllerPath == null) ?  "modules/WanaD.AppService/ManageUserGroupAppService" : options.controllerPath);
        this.Options = options.ajaxOptions;

        return this;
    }

    
    // post: api/${controller}/
    //public static RouteFindAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageUserGroupAppService/FindAsync`;
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
    //public static RouteCountAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageUserGroupAppService/CountAsync`;
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
    //public static RouteRemoveAsync = (userUID: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageUserGroupAppService/RemoveAsync`;
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
    //public static RouteLoadAsync = (userUID: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageUserGroupAppService/LoadAsync`;
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
    //public static RouteUpdateAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageUserGroupAppService/UpdateAsync`;
    public RouteUpdateAsync() : string {
        return this.ControllerUrl + "/"+"UpdateAsync";
    }
    public UpdateAsync(request: GroupUpdateRequest): JQuery.jqXHR<void> {
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
    //public static RouteAddAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageUserGroupAppService/AddAsync`;
    public RouteAddAsync() : string {
        return this.ControllerUrl + "/"+"AddAsync";
    }
    public AddAsync(request: GroupUpdateRequest): JQuery.jqXHR<string> {
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
    //public static RouteAddMemberAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageUserGroupAppService/AddMemberAsync`;
    public RouteAddMemberAsync() : string {
        return this.ControllerUrl + "/"+"AddMemberAsync";
    }
    public AddMemberAsync(request: MemberUpdateRequest): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteAddMemberAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(request),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteRemoveMemberAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageUserGroupAppService/RemoveMemberAsync`;
    public RouteRemoveMemberAsync() : string {
        return this.ControllerUrl + "/"+"RemoveMemberAsync";
    }
    public RemoveMemberAsync(request: MemberUpdateRequest): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteRemoveMemberAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(request),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindMemberAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageUserGroupAppService/FindMemberAsync`;
    public RouteFindMemberAsync() : string {
        return this.ControllerUrl + "/"+"FindMemberAsync";
    }
    public FindMemberAsync(parameter: ManageUserGroupMemberSearchParameter): JQuery.jqXHR<MemberData01[]> {
        return $.ajax({
                url: this.RouteFindMemberAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(parameter),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteCountMemberAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageUserGroupAppService/CountMemberAsync`;
    public RouteCountMemberAsync() : string {
        return this.ControllerUrl + "/"+"CountMemberAsync";
    }
    public CountMemberAsync(criteria: UserCriteria01): JQuery.jqXHR<number> {
        return $.ajax({
                url: this.RouteCountMemberAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(criteria),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/?textInput=${encodeURIComponent(textInput)}
    //public static RouteFindUserAutoCompleteDataAsync = (textInput: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageUserGroupAppService/FindUserAutoCompleteDataAsync`;
    public RouteFindUserAutoCompleteDataAsync(textInput: string) : string {
        return this.ControllerUrl + "/"+"FindUserAutoCompleteDataAsync";
    }
    public FindUserAutoCompleteDataAsync(textInput: string): JQuery.jqXHR<UserData01[]> {
        return $.ajax({
                url: this.RouteFindUserAutoCompleteDataAsync(textInput),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(textInput),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteRetrieveUserProfileAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ManageUserGroupAppService/RetrieveUserProfileAsync`;
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
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
}

export default ManageUserGroupAppService;



