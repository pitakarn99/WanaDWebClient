
 



 
 import {fs} from "Config/FsConfig";
 import { FsAjaxSettings } from "../../../../Lib/Fs.Core.Aurelia/Components/FsAjaxSettings";
 

 
 
    import OrderParameter from 'Modules/WanaD/Scripts/AppServiceContract/OrderParameter';

    import OrderData from 'Modules/WanaD/Scripts/AppServiceContract/OrderData';

    import OrderSearchCriteria from 'Modules/WanaD/Scripts/AppServiceContract/OrderSearchCriteria';

    import FactorySearchCriteria from 'Modules/WanaD/Scripts/AppServiceContract/FactorySearchCriteria';

    import FactoryData from 'Modules/WanaD/Scripts/AppServiceContract/FactoryData';

    import ProductTypeData from 'Modules/WanaD/Scripts/AppServiceContract/ProductTypeData';

    import ProductMasterSearchCriteria from 'Modules/WanaD/Scripts/AppServiceContract/ProductMasterSearchCriteria';

    import ProductMasterData from 'Modules/WanaD/Scripts/AppServiceContract/ProductMasterData';

    import OrderRequest from 'Modules/WanaD/Scripts/AppServiceContract/OrderRequest';


    //module OrderAppService {
    

    class OrderAppService {

    ControllerUrl : string
    Options : FsAjaxSettings

    constructor(serverBaseUrl : string = null, controllerPath : string = null, ajaxOptions : FsAjaxSettings = null){
        this.ControllerUrl = ((serverBaseUrl == null || serverBaseUrl == "") ? fs.Config.ServiceBaseUrl : serverBaseUrl) + ((controllerPath == null || controllerPath == "") ?  "modules/WanaD.AppService/OrderAppService" : controllerPath);
        this.Options = ajaxOptions;
    }

    public Init(options : any = { serverBaseUrl :  null, controllerPath : null, ajaxOptions : null }){
        this.ControllerUrl = ((options.serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : options.serverBaseUrl) + ((options.controllerPath == null) ?  "modules/WanaD.AppService/OrderAppService" : options.controllerPath);
        this.Options = options.ajaxOptions;

        return this;
    }

    
    // post: api/${controller}/
    //public static RouteFindAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/OrderAppService/FindAsync`;
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
    //public static RouteCount = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/OrderAppService/Count`;
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
    //public static RouteFindByIdAsync = (orderId: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/OrderAppService/FindByIdAsync`;
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
    //public static RouteOrderSaveAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/OrderAppService/OrderSaveAsync`;
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
    //public static RouteOrderUpdateAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/OrderAppService/OrderUpdateAsync`;
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
    //public static RouteOrderRemoveAsync = (orderId: string) => this.ServiceUrl + `modules/WanaD.AppServiceContract/OrderAppService/OrderRemoveAsync`;
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
    //public static RouteFindFactoryAutoCompleteAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/OrderAppService/FindFactoryAutoCompleteAsync`;
    public RouteFindFactoryAutoCompleteAsync() : string {
        return this.ControllerUrl + "/"+"FindFactoryAutoCompleteAsync";
    }
    public FindFactoryAutoCompleteAsync(parameter: FactorySearchCriteria): JQuery.jqXHR<FactoryData[]> {
        return $.ajax({
                url: this.RouteFindFactoryAutoCompleteAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(parameter),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteFindProductTypeAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/OrderAppService/FindProductTypeAsync`;
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
    
    // post: api/${controller}/
    //public static RouteFindProductMasterAutoCompleteAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/OrderAppService/FindProductMasterAutoCompleteAsync`;
    public RouteFindProductMasterAutoCompleteAsync() : string {
        return this.ControllerUrl + "/"+"FindProductMasterAutoCompleteAsync";
    }
    public FindProductMasterAutoCompleteAsync(parameter: ProductMasterSearchCriteria): JQuery.jqXHR<ProductMasterData[]> {
        return $.ajax({
                url: this.RouteFindProductMasterAutoCompleteAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(parameter),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteCloseOrderAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/OrderAppService/CloseOrderAsync`;
    public RouteCloseOrderAsync() : string {
        return this.ControllerUrl + "/"+"CloseOrderAsync";
    }
    public CloseOrderAsync(orderRequest: OrderRequest): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteCloseOrderAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(orderRequest),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteReSubmitOrderAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/OrderAppService/ReSubmitOrderAsync`;
    public RouteReSubmitOrderAsync() : string {
        return this.ControllerUrl + "/"+"ReSubmitOrderAsync";
    }
    public ReSubmitOrderAsync(orderRequest: OrderData): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteReSubmitOrderAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(orderRequest),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteWithdrawOrderAsync = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/OrderAppService/WithdrawOrderAsync`;
    public RouteWithdrawOrderAsync() : string {
        return this.ControllerUrl + "/"+"WithdrawOrderAsync";
    }
    public WithdrawOrderAsync(orderRequest: OrderRequest): JQuery.jqXHR<void> {
        return $.ajax({
                url: this.RouteWithdrawOrderAsync(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(orderRequest),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
}

export default OrderAppService;



