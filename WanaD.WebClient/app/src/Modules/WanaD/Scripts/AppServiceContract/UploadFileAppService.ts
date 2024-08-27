
 



 
 import {fs} from "Config/FsConfig";
 import { FsAjaxSettings } from "../../../../Lib/Fs.Core.Aurelia/Components/FsAjaxSettings";
 

 
 
    import FileData from 'Modules/Core/Scripts/AppServiceContract/FileData';

    import AttachmentRequest from 'Modules/WanaD/Scripts/AppServiceContract/AttachmentRequest';

    import FileInfoData from 'Modules/Core/Scripts/FileInfoData';


    //module UploadFileAppService {
    

    class UploadFileAppService {

    ControllerUrl : string
    Options : FsAjaxSettings

    constructor(serverBaseUrl : string = null, controllerPath : string = null, ajaxOptions : FsAjaxSettings = null){
        this.ControllerUrl = ((serverBaseUrl == null || serverBaseUrl == "") ? fs.Config.ServiceBaseUrl : serverBaseUrl) + ((controllerPath == null || controllerPath == "") ?  "modules/WanaD.AppService/UploadFileAppService" : controllerPath);
        this.Options = ajaxOptions;
    }

    public Init(options : any = { serverBaseUrl :  null, controllerPath : null, ajaxOptions : null }){
        this.ControllerUrl = ((options.serverBaseUrl == null) ? fs.Config.ServiceBaseUrl : options.serverBaseUrl) + ((options.controllerPath == null) ?  "modules/WanaD.AppService/UploadFileAppService" : options.controllerPath);
        this.Options = options.ajaxOptions;

        return this;
    }

    
    // post: api/${controller}/
    //public static RouteUpload = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/UploadFileAppService/Upload`;
    public RouteUpload() : string {
        return this.ControllerUrl + "/"+"Upload";
    }
    public Upload(): JQuery.jqXHR<FileData> {
        return $.ajax({
                url: this.RouteUpload(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: null,
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
    // post: api/${controller}/
    //public static RouteUpdateAttachment = () => this.ServiceUrl + `modules/WanaD.AppServiceContract/UploadFileAppService/UpdateAttachment`;
    public RouteUpdateAttachment() : string {
        return this.ControllerUrl + "/"+"UpdateAttachment";
    }
    public UpdateAttachment(importRequest: AttachmentRequest): JQuery.jqXHR<FileInfoData[]> {
        return $.ajax({
                url: this.RouteUpdateAttachment(),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: 'post',
                data: JSON.stringify(importRequest),
                async: this.Options == null || this.Options.async == null ? true : this.Options.async,
                showLoading: this.Options == null || this.Options.showLoading == null ? true : this.Options.showLoading
                } as FsAjaxSettings);
    }                
    
}

export default UploadFileAppService;



