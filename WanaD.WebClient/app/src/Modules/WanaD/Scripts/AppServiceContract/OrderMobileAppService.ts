
 



 
 import {fs} from "Config/FsConfig";
 import { FsAjaxSettings } from "../../../../Lib/Fs.Core.Aurelia/Components/FsAjaxSettings";
 

 
 
    import OrderParameter from 'Modules/WanaD/Scripts/AppServiceContract/OrderParameter';

    import OrderData from 'Modules/WanaD/Scripts/AppServiceContract/OrderData';

    import OrderSearchCriteria from 'Modules/WanaD/Scripts/AppServiceContract/OrderSearchCriteria';

    import OrderRequest from 'Modules/WanaD/Scripts/AppServiceContract/OrderRequest';

    import ProductTypeData from 'Modules/WanaD/Scripts/AppServiceContract/ProductTypeData';

    import DocHistoryData from 'Modules/WanaD/Scripts/AppServiceContract/DocHistoryData';

    import DocDeliveryData from 'Modules/WanaD/Scripts/AppServiceContract/DocDeliveryData';


    //module OrderMobileAppService {
    

    class OrderMobileAppService {

    ControllerUrl : string
    Options : FsAjaxSettings

    constructor(serverBaseUrl : string = null, controllerPath : string = null, ajaxOptions : FsAjaxSettings = null){
        this.ControllerUrl = ((serverBaseUrl == null || serverBaseUrl == "") ? fs.Config.ServiceBaseUrl : serverBaseUrl) + ((controllerPath == null || controllerPath == "") ?  "modules/WanaD.AppService/OrderMobileAppService" : controllerPath);
        this.Options = ajaxOptions;
    }

    public Init(options : any = { serverBaseUrl :  null, controllerPath : null, ajaxOptions : null }){
        this.ControllerUrl = ((options.serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : options.serverBaseUrl) + ((options.controllerPath == null) ?  "modules/WanaD.AppService/OrderMobileAppService" : options.controllerPath);
        this.Options = options.ajaxOptions;

        return this;
    }

    
    // post: api/${controller}/
    //public static RouteFindAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/OrderMobileAppService/FindAsync`;
    public RouteFindAsync() : string {
        return this.ControllerUrl + "/"+"FindAsync";
    }
    public FindAsync(parameter: OrderParameter): JQuery.jqXHR<OrderData[]> {
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
    //public static RouteCount = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/OrderMobileAppService/Count`;
    public RouteCount() : string {
        return this.ControllerUrl + "/"+"Count";
    }
    public Count(criteria: OrderSearchCriteria): JQuery.jqXHR<number> {
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
    
    // post: api/${controller}/?orderId=${encodeURIComponent(orderId)}
    //public static RouteFindByIdAsync = (orderId: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/OrderMobileAppService/FindByIdAsync`;
    public RouteFindByIdAsync(orderId: string) : string {
        return this.ControllerUrl + "/"+"FindByIdAsync";
    }
    public FindByIdAsync(orderId: string): JQuery.jqXHR<OrderData> {
        return $.ajax({
                url: this.RouteFindByIdAsync(orderId),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(orderId),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteOrderSaveAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/OrderMobileAppService/OrderSaveAsync`;
    public RouteOrderSaveAsync() : string {
        return this.ControllerUrl + "/"+"OrderSaveAsync";
    }
    public OrderSaveAsync(orderSaveData: OrderData): JQuery.jqXHR<string> {
        return $.ajax({
                url: this.RouteOrderSaveAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(orderSaveData),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteOrderUpdateAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/OrderMobileAppService/OrderUpdateAsync`;
    public RouteOrderUpdateAsync() : string {
        return this.ControllerUrl + "/"+"OrderUpdateAsync";
    }
    public OrderUpdateAsync(orderData: OrderData): JQuery.jqXHR<string> {
        return $.ajax({
                url: this.RouteOrderUpdateAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(orderData),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/?orderId=${encodeURIComponent(orderId)}
    //public static RouteOrderRemoveAsync = (orderId: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/OrderMobileAppService/OrderRemoveAsync`;
    public RouteOrderRemoveAsync(orderId: string) : string {
        return this.ControllerUrl + "/"+"OrderRemoveAsync";
    }
    public OrderRemoveAsync(orderId: string): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteOrderRemoveAsync(orderId),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(orderId),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteOrderWorkFlowAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/OrderMobileAppService/OrderWorkFlowAsync`;
    public RouteOrderWorkFlowAsync() : string {
        return this.ControllerUrl + "/"+"OrderWorkFlowAsync";
    }
    public OrderWorkFlowAsync(orderRequest: OrderRequest): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteOrderWorkFlowAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(orderRequest),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindProductTypeAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/OrderMobileAppService/FindProductTypeAsync`;
    public RouteFindProductTypeAsync() : string {
        return this.ControllerUrl + "/"+"FindProductTypeAsync";
    }
    public FindProductTypeAsync(): JQuery.jqXHR<ProductTypeData[]> {
        return $.ajax({
                url: this.RouteFindProductTypeAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: null,
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/?docId=${encodeURIComponent(docId)}
    //public static RouteFindHistoryAsync = (docId: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/OrderMobileAppService/FindHistoryAsync`;
    public RouteFindHistoryAsync(docId: string) : string {
        return this.ControllerUrl + "/"+"FindHistoryAsync";
    }
    public FindHistoryAsync(docId: string): JQuery.jqXHR<DocHistoryData[]> {
        return $.ajax({
                url: this.RouteFindHistoryAsync(docId),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(docId),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/?orderId=${encodeURIComponent(orderId)}
    //public static RouteFindDeliveryAsync = (orderId: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/OrderMobileAppService/FindDeliveryAsync`;
    public RouteFindDeliveryAsync(orderId: string) : string {
        return this.ControllerUrl + "/"+"FindDeliveryAsync";
    }
    public FindDeliveryAsync(orderId: string): JQuery.jqXHR<DocDeliveryData[]> {
        return $.ajax({
                url: this.RouteFindDeliveryAsync(orderId),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(orderId),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
}

export default OrderMobileAppService;



