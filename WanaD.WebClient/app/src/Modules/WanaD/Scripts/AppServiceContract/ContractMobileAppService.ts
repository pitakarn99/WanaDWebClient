
 



 
 import {fs} from "Config/FsConfig";
 import { FsAjaxSettings } from "../../../../Lib/Fs.Core.Aurelia/Components/FsAjaxSettings";
 

 
 
    import ContractParameter from 'Modules/WanaD/Scripts/AppServiceContract/ContractParameter';

    import ContractData from 'Modules/WanaD/Scripts/AppServiceContract/ContractData';

    import ContractDetailData from 'Modules/WanaD/Scripts/AppServiceContract/ContractDetailData';

    import ContractRequest from 'Modules/WanaD/Scripts/AppServiceContract/ContractRequest';

    import ContractSearchCriteria from 'Modules/WanaD/Scripts/AppServiceContract/ContractSearchCriteria';


    //module ContractMobileAppService {
    

    class ContractMobileAppService {

    ControllerUrl : string
    Options : FsAjaxSettings

    constructor(serverBaseUrl : string = null, controllerPath : string = null, ajaxOptions : FsAjaxSettings = null){
        this.ControllerUrl = ((serverBaseUrl == null || serverBaseUrl == "") ? fs.Config.ServiceBaseUrl : serverBaseUrl) + ((controllerPath == null || controllerPath == "") ?  "modules/WanaD.AppService/ContractMobileAppService" : controllerPath);
        this.Options = ajaxOptions;
    }

    public Init(options : any = { serverBaseUrl :  null, controllerPath : null, ajaxOptions : null }){
        this.ControllerUrl = ((options.serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : options.serverBaseUrl) + ((options.controllerPath == null) ?  "modules/WanaD.AppService/ContractMobileAppService" : options.controllerPath);
        this.Options = options.ajaxOptions;

        return this;
    }

    
    // post: api/${controller}/
    //public static RouteFindAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ContractMobileAppService/FindAsync`;
    public RouteFindAsync() : string {
        return this.ControllerUrl + "/"+"FindAsync";
    }
    public FindAsync(parameter: ContractParameter): JQuery.jqXHR<ContractData[]> {
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
    
    // post: api/${controller}/?contractId=${encodeURIComponent(contractId)}
    //public static RouteFindByIdAsync = (contractId: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/ContractMobileAppService/FindByIdAsync`;
    public RouteFindByIdAsync(contractId: string) : string {
        return this.ControllerUrl + "/"+"FindByIdAsync";
    }
    public FindByIdAsync(contractId: string): JQuery.jqXHR<ContractDetailData> {
        return $.ajax({
                url: this.RouteFindByIdAsync(contractId),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(contractId),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteContractWorkFlowAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ContractMobileAppService/ContractWorkFlowAsync`;
    public RouteContractWorkFlowAsync() : string {
        return this.ControllerUrl + "/"+"ContractWorkFlowAsync";
    }
    public ContractWorkFlowAsync(contractRequest: ContractRequest): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteContractWorkFlowAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(contractRequest),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteCount = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/ContractMobileAppService/Count`;
    public RouteCount() : string {
        return this.ControllerUrl + "/"+"Count";
    }
    public Count(criteria: ContractSearchCriteria): JQuery.jqXHR<number> {
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
    
}

export default ContractMobileAppService;



