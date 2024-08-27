
 



 
 import {fs} from "Config/FsConfig";
 import { FsAjaxSettings } from "../../../../Lib/Fs.Core.Aurelia/Components/FsAjaxSettings";
 

 
 
    import FactoryParameter from 'Modules/WanaD/Scripts/AppServiceContract/FactoryParameter';

    import FactoryData from 'Modules/WanaD/Scripts/AppServiceContract/FactoryData';

    import BankData from 'Modules/WanaD/Scripts/AppServiceContract/BankData';

    import FactorySearchCriteria from 'Modules/WanaD/Scripts/AppServiceContract/FactorySearchCriteria';

    import FactoryMemberParameter from 'Modules/WanaD/Scripts/AppServiceContract/FactoryMemberParameter';

    import FactoryMemberData from 'Modules/WanaD/Scripts/AppServiceContract/FactoryMemberData';

    import FactoryMemberSearchCriteria from 'Modules/WanaD/Scripts/AppServiceContract/FactoryMemberSearchCriteria';


    //module FactoryAppService {
    

    class FactoryAppService {

    ControllerUrl : string
    Options : FsAjaxSettings

    constructor(serverBaseUrl : string = null, controllerPath : string = null, ajaxOptions : FsAjaxSettings = null){
        this.ControllerUrl = ((serverBaseUrl == null || serverBaseUrl == "") ? fs.Config.ServiceBaseUrl : serverBaseUrl) + ((controllerPath == null || controllerPath == "") ?  "modules/WanaD.AppService/FactoryAppService" : controllerPath);
        this.Options = ajaxOptions;
    }

    public Init(options : any = { serverBaseUrl :  null, controllerPath : null, ajaxOptions : null }){
        this.ControllerUrl = ((options.serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : options.serverBaseUrl) + ((options.controllerPath == null) ?  "modules/WanaD.AppService/FactoryAppService" : options.controllerPath);
        this.Options = options.ajaxOptions;

        return this;
    }

    
    // post: api/${controller}/
    //public static RouteFindAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FactoryAppService/FindAsync`;
    public RouteFindAsync() : string {
        return this.ControllerUrl + "/"+"FindAsync";
    }
    public FindAsync(parameter: FactoryParameter): JQuery.jqXHR<FactoryData[]> {
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
    
    // post: api/${controller}/?factoryId=${encodeURIComponent(factoryId)}
    //public static RouteFindByIdAsync = (factoryId: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/FactoryAppService/FindByIdAsync`;
    public RouteFindByIdAsync(factoryId: string) : string {
        return this.ControllerUrl + "/"+"FindByIdAsync";
    }
    public FindByIdAsync(factoryId: string): JQuery.jqXHR<FactoryData> {
        return $.ajax({
                url: this.RouteFindByIdAsync(factoryId),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(factoryId),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindBankAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FactoryAppService/FindBankAsync`;
    public RouteFindBankAsync() : string {
        return this.ControllerUrl + "/"+"FindBankAsync";
    }
    public FindBankAsync(): JQuery.jqXHR<BankData[]> {
        return $.ajax({
                url: this.RouteFindBankAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: null,
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFactorySaveAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FactoryAppService/FactorySaveAsync`;
    public RouteFactorySaveAsync() : string {
        return this.ControllerUrl + "/"+"FactorySaveAsync";
    }
    public FactorySaveAsync(factorySaveData: FactoryData): JQuery.jqXHR<string> {
        return $.ajax({
                url: this.RouteFactorySaveAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(factorySaveData),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/?factoryId=${encodeURIComponent(factoryId)}
    //public static RouteFactoryRemoveAsync = (factoryId: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/FactoryAppService/FactoryRemoveAsync`;
    public RouteFactoryRemoveAsync(factoryId: string) : string {
        return this.ControllerUrl + "/"+"FactoryRemoveAsync";
    }
    public FactoryRemoveAsync(factoryId: string): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteFactoryRemoveAsync(factoryId),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(factoryId),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteCount = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FactoryAppService/Count`;
    public RouteCount() : string {
        return this.ControllerUrl + "/"+"Count";
    }
    public Count(criteria: FactorySearchCriteria): JQuery.jqXHR<number> {
        return $.ajax({
                url: this.RouteCount(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(criteria),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindFactoryMemberAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FactoryAppService/FindFactoryMemberAsync`;
    public RouteFindFactoryMemberAsync() : string {
        return this.ControllerUrl + "/"+"FindFactoryMemberAsync";
    }
    public FindFactoryMemberAsync(parameter: FactoryMemberParameter): JQuery.jqXHR<FactoryMemberData[]> {
        return $.ajax({
                url: this.RouteFindFactoryMemberAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(parameter),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFactoryMemberCount = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FactoryAppService/FactoryMemberCount`;
    public RouteFactoryMemberCount() : string {
        return this.ControllerUrl + "/"+"FactoryMemberCount";
    }
    public FactoryMemberCount(criteria: FactoryMemberSearchCriteria): JQuery.jqXHR<number> {
        return $.ajax({
                url: this.RouteFactoryMemberCount(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(criteria),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindFactoryMemberAutoCompleteAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FactoryAppService/FindFactoryMemberAutoCompleteAsync`;
    public RouteFindFactoryMemberAutoCompleteAsync() : string {
        return this.ControllerUrl + "/"+"FindFactoryMemberAutoCompleteAsync";
    }
    public FindFactoryMemberAutoCompleteAsync(parameter: FactoryMemberSearchCriteria): JQuery.jqXHR<FactoryMemberData[]> {
        return $.ajax({
                url: this.RouteFindFactoryMemberAutoCompleteAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(parameter),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteAddFactoryMemberAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FactoryAppService/AddFactoryMemberAsync`;
    public RouteAddFactoryMemberAsync() : string {
        return this.ControllerUrl + "/"+"AddFactoryMemberAsync";
    }
    public AddFactoryMemberAsync(factoryMemberData: FactoryMemberData): JQuery.jqXHR<string> {
        return $.ajax({
                url: this.RouteAddFactoryMemberAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(factoryMemberData),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteUpdateFactoryMemberAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FactoryAppService/UpdateFactoryMemberAsync`;
    public RouteUpdateFactoryMemberAsync() : string {
        return this.ControllerUrl + "/"+"UpdateFactoryMemberAsync";
    }
    public UpdateFactoryMemberAsync(factoryMemberData: FactoryMemberData): JQuery.jqXHR<string> {
        return $.ajax({
                url: this.RouteUpdateFactoryMemberAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(factoryMemberData),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteRemoveFactoryMemberAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FactoryAppService/RemoveFactoryMemberAsync`;
    public RouteRemoveFactoryMemberAsync() : string {
        return this.ControllerUrl + "/"+"RemoveFactoryMemberAsync";
    }
    public RemoveFactoryMemberAsync(factoryMemberData: FactoryMemberData): JQuery.jqXHR<string> {
        return $.ajax({
                url: this.RouteRemoveFactoryMemberAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(factoryMemberData),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
}

export default FactoryAppService;



