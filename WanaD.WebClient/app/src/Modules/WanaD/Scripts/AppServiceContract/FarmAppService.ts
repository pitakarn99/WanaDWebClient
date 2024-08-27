
 



 
 import {fs} from "Config/FsConfig";
 import { FsAjaxSettings } from "../../../../Lib/Fs.Core.Aurelia/Components/FsAjaxSettings";
 

 
 
    import FarmParameter from 'Modules/WanaD/Scripts/AppServiceContract/FarmParameter';

    import FarmData from 'Modules/WanaD/Scripts/AppServiceContract/FarmData';

    import FarmSearchCriteria from 'Modules/WanaD/Scripts/AppServiceContract/FarmSearchCriteria';

    import EthnicityData from 'Modules/WanaD/Scripts/AppServiceContract/EthnicityData';

    import ReligionData from 'Modules/WanaD/Scripts/AppServiceContract/ReligionData';

    import PlotParameter from 'Modules/WanaD/Scripts/AppServiceContract/PlotParameter';

    import PlotData from 'Modules/WanaD/Scripts/AppServiceContract/PlotData';

    import PlotSearchCriteria from 'Modules/WanaD/Scripts/AppServiceContract/PlotSearchCriteria';

    import PlotDeviceParameter from 'Modules/WanaD/Scripts/AppServiceContract/PlotDeviceParameter';

    import PlotDeviceData from 'Modules/WanaD/Scripts/AppServiceContract/PlotDeviceData';

    import PlotDeviceSearchCriteria from 'Modules/WanaD/Scripts/AppServiceContract/PlotDeviceSearchCriteria';

    import BankData from 'Modules/WanaD/Scripts/AppServiceContract/BankData';

    import ResponsiblePersonParameter from 'Modules/WanaD/Scripts/AppServiceContract/ResponsiblePersonParameter';

    import ResponsiblePersonData from 'Modules/WanaD/Scripts/AppServiceContract/ResponsiblePersonData';

    import ResponsiblePersonSearchCriteria from 'Modules/WanaD/Scripts/AppServiceContract/ResponsiblePersonSearchCriteria';

    import UserProfileData from 'Modules/WanaD/Scripts/AppServiceContract/UserProfileData';

    import RemoveResponsiblePersonData from 'Modules/WanaD/Scripts/AppServiceContract/RemoveResponsiblePersonData';

    import DeviceData from 'Modules/WanaD/Scripts/AppServiceContract/DeviceData';


    //module FarmAppService {
    

    class FarmAppService {

    ControllerUrl : string
    Options : FsAjaxSettings

    constructor(serverBaseUrl : string = null, controllerPath : string = null, ajaxOptions : FsAjaxSettings = null){
        this.ControllerUrl = ((serverBaseUrl == null || serverBaseUrl == "") ? fs.Config.ServiceBaseUrl : serverBaseUrl) + ((controllerPath == null || controllerPath == "") ?  "modules/WanaD.AppService/FarmAppService" : controllerPath);
        this.Options = ajaxOptions;
    }

    public Init(options : any = { serverBaseUrl :  null, controllerPath : null, ajaxOptions : null }){
        this.ControllerUrl = ((options.serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : options.serverBaseUrl) + ((options.controllerPath == null) ?  "modules/WanaD.AppService/FarmAppService" : options.controllerPath);
        this.Options = options.ajaxOptions;

        return this;
    }

    
    // post: api/${controller}/
    //public static RouteFindAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FarmAppService/FindAsync`;
    public RouteFindAsync() : string {
        return this.ControllerUrl + "/"+"FindAsync";
    }
    public FindAsync(parameter: FarmParameter): JQuery.jqXHR<FarmData[]> {
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
    //public static RouteCount = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FarmAppService/Count`;
    public RouteCount() : string {
        return this.ControllerUrl + "/"+"Count";
    }
    public Count(criteria: FarmSearchCriteria): JQuery.jqXHR<number> {
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
    
    // post: api/${controller}/?farmId=${encodeURIComponent(farmId)}
    //public static RouteFindByIdAsync = (farmId: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/FarmAppService/FindByIdAsync`;
    public RouteFindByIdAsync(farmId: string) : string {
        return this.ControllerUrl + "/"+"FindByIdAsync";
    }
    public FindByIdAsync(farmId: string): JQuery.jqXHR<FarmData> {
        return $.ajax({
                url: this.RouteFindByIdAsync(farmId),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(farmId),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindEthnicityAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FarmAppService/FindEthnicityAsync`;
    public RouteFindEthnicityAsync() : string {
        return this.ControllerUrl + "/"+"FindEthnicityAsync";
    }
    public FindEthnicityAsync(): JQuery.jqXHR<EthnicityData[]> {
        return $.ajax({
                url: this.RouteFindEthnicityAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: null,
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindReligionAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FarmAppService/FindReligionAsync`;
    public RouteFindReligionAsync() : string {
        return this.ControllerUrl + "/"+"FindReligionAsync";
    }
    public FindReligionAsync(): JQuery.jqXHR<ReligionData[]> {
        return $.ajax({
                url: this.RouteFindReligionAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: null,
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFarmSaveAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FarmAppService/FarmSaveAsync`;
    public RouteFarmSaveAsync() : string {
        return this.ControllerUrl + "/"+"FarmSaveAsync";
    }
    public FarmSaveAsync(farmSaveData: FarmData): JQuery.jqXHR<string> {
        return $.ajax({
                url: this.RouteFarmSaveAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(farmSaveData),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindPlotAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FarmAppService/FindPlotAsync`;
    public RouteFindPlotAsync() : string {
        return this.ControllerUrl + "/"+"FindPlotAsync";
    }
    public FindPlotAsync(parameter: PlotParameter): JQuery.jqXHR<PlotData[]> {
        return $.ajax({
                url: this.RouteFindPlotAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(parameter),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RoutePlotCount = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FarmAppService/PlotCount`;
    public RoutePlotCount() : string {
        return this.ControllerUrl + "/"+"PlotCount";
    }
    public PlotCount(criteria: PlotSearchCriteria): JQuery.jqXHR<number> {
        return $.ajax({
                url: this.RoutePlotCount(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(criteria),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindPlotDeviceAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FarmAppService/FindPlotDeviceAsync`;
    public RouteFindPlotDeviceAsync() : string {
        return this.ControllerUrl + "/"+"FindPlotDeviceAsync";
    }
    public FindPlotDeviceAsync(parameter: PlotDeviceParameter): JQuery.jqXHR<PlotDeviceData[]> {
        return $.ajax({
                url: this.RouteFindPlotDeviceAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(parameter),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RoutePlotDeviceCount = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FarmAppService/PlotDeviceCount`;
    public RoutePlotDeviceCount() : string {
        return this.ControllerUrl + "/"+"PlotDeviceCount";
    }
    public PlotDeviceCount(criteria: PlotDeviceSearchCriteria): JQuery.jqXHR<number> {
        return $.ajax({
                url: this.RoutePlotDeviceCount(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(criteria),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RoutePlotSaveAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FarmAppService/PlotSaveAsync`;
    public RoutePlotSaveAsync() : string {
        return this.ControllerUrl + "/"+"PlotSaveAsync";
    }
    public PlotSaveAsync(plotSaveData: PlotData): JQuery.jqXHR<string> {
        return $.ajax({
                url: this.RoutePlotSaveAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(plotSaveData),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RoutePlotDeviceSaveAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FarmAppService/PlotDeviceSaveAsync`;
    public RoutePlotDeviceSaveAsync() : string {
        return this.ControllerUrl + "/"+"PlotDeviceSaveAsync";
    }
    public PlotDeviceSaveAsync(plotDeviceSaveData: PlotDeviceData): JQuery.jqXHR<string> {
        return $.ajax({
                url: this.RoutePlotDeviceSaveAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(plotDeviceSaveData),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindBankAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FarmAppService/FindBankAsync`;
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
    //public static RouteFindPlotNameAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FarmAppService/FindPlotNameAsync`;
    public RouteFindPlotNameAsync() : string {
        return this.ControllerUrl + "/"+"FindPlotNameAsync";
    }
    public FindPlotNameAsync(parameter: PlotSearchCriteria): JQuery.jqXHR<PlotData[]> {
        return $.ajax({
                url: this.RouteFindPlotNameAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(parameter),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/?farmId=${encodeURIComponent(farmId)}
    //public static RouteFarmRemoveAsync = (farmId: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/FarmAppService/FarmRemoveAsync`;
    public RouteFarmRemoveAsync(farmId: string) : string {
        return this.ControllerUrl + "/"+"FarmRemoveAsync";
    }
    public FarmRemoveAsync(farmId: string): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteFarmRemoveAsync(farmId),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(farmId),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/?plotId=${encodeURIComponent(plotId)}
    //public static RoutePlotRemoveAsync = (plotId: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/FarmAppService/PlotRemoveAsync`;
    public RoutePlotRemoveAsync(plotId: string) : string {
        return this.ControllerUrl + "/"+"PlotRemoveAsync";
    }
    public PlotRemoveAsync(plotId: string): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RoutePlotRemoveAsync(plotId),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(plotId),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/?deviceId=${encodeURIComponent(deviceId)}
    //public static RoutePlotDeviceRemoveAsync = (deviceId: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/FarmAppService/PlotDeviceRemoveAsync`;
    public RoutePlotDeviceRemoveAsync(deviceId: string) : string {
        return this.ControllerUrl + "/"+"PlotDeviceRemoveAsync";
    }
    public PlotDeviceRemoveAsync(deviceId: string): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RoutePlotDeviceRemoveAsync(deviceId),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(deviceId),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindResponsiblePersonAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FarmAppService/FindResponsiblePersonAsync`;
    public RouteFindResponsiblePersonAsync() : string {
        return this.ControllerUrl + "/"+"FindResponsiblePersonAsync";
    }
    public FindResponsiblePersonAsync(parameter: ResponsiblePersonParameter): JQuery.jqXHR<ResponsiblePersonData[]> {
        return $.ajax({
                url: this.RouteFindResponsiblePersonAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(parameter),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteResponsiblePersonCount = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FarmAppService/ResponsiblePersonCount`;
    public RouteResponsiblePersonCount() : string {
        return this.ControllerUrl + "/"+"ResponsiblePersonCount";
    }
    public ResponsiblePersonCount(criteria: ResponsiblePersonSearchCriteria): JQuery.jqXHR<number> {
        return $.ajax({
                url: this.RouteResponsiblePersonCount(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(criteria),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindUserProfileAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FarmAppService/FindUserProfileAsync`;
    public RouteFindUserProfileAsync() : string {
        return this.ControllerUrl + "/"+"FindUserProfileAsync";
    }
    public FindUserProfileAsync(): JQuery.jqXHR<UserProfileData[]> {
        return $.ajax({
                url: this.RouteFindUserProfileAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: null,
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindResponsiblePersonAutoCompleteAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FarmAppService/FindResponsiblePersonAutoCompleteAsync`;
    public RouteFindResponsiblePersonAutoCompleteAsync() : string {
        return this.ControllerUrl + "/"+"FindResponsiblePersonAutoCompleteAsync";
    }
    public FindResponsiblePersonAutoCompleteAsync(parameter: ResponsiblePersonSearchCriteria): JQuery.jqXHR<ResponsiblePersonData[]> {
        return $.ajax({
                url: this.RouteFindResponsiblePersonAutoCompleteAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(parameter),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindPlotAutoCompleteAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FarmAppService/FindPlotAutoCompleteAsync`;
    public RouteFindPlotAutoCompleteAsync() : string {
        return this.ControllerUrl + "/"+"FindPlotAutoCompleteAsync";
    }
    public FindPlotAutoCompleteAsync(parameter: PlotSearchCriteria): JQuery.jqXHR<PlotData[]> {
        return $.ajax({
                url: this.RouteFindPlotAutoCompleteAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(parameter),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteAddResponsiblePersonAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FarmAppService/AddResponsiblePersonAsync`;
    public RouteAddResponsiblePersonAsync() : string {
        return this.ControllerUrl + "/"+"AddResponsiblePersonAsync";
    }
    public AddResponsiblePersonAsync(responsiblePersonSaveData: ResponsiblePersonData): JQuery.jqXHR<string> {
        return $.ajax({
                url: this.RouteAddResponsiblePersonAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(responsiblePersonSaveData),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteUpdateResponsiblePersonAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FarmAppService/UpdateResponsiblePersonAsync`;
    public RouteUpdateResponsiblePersonAsync() : string {
        return this.ControllerUrl + "/"+"UpdateResponsiblePersonAsync";
    }
    public UpdateResponsiblePersonAsync(responsiblePersonSaveData: ResponsiblePersonData): JQuery.jqXHR<string> {
        return $.ajax({
                url: this.RouteUpdateResponsiblePersonAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(responsiblePersonSaveData),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteRemoveResponsiblePersonAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FarmAppService/RemoveResponsiblePersonAsync`;
    public RouteRemoveResponsiblePersonAsync() : string {
        return this.ControllerUrl + "/"+"RemoveResponsiblePersonAsync";
    }
    public RemoveResponsiblePersonAsync(removeResponsiblePersonData: RemoveResponsiblePersonData): JQuery.jqXHR<string> {
        return $.ajax({
                url: this.RouteRemoveResponsiblePersonAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(removeResponsiblePersonData),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindMasterDeviceAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/FarmAppService/FindMasterDeviceAsync`;
    public RouteFindMasterDeviceAsync() : string {
        return this.ControllerUrl + "/"+"FindMasterDeviceAsync";
    }
    public FindMasterDeviceAsync(): JQuery.jqXHR<DeviceData[]> {
        return $.ajax({
                url: this.RouteFindMasterDeviceAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: null,
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
}

export default FarmAppService;



