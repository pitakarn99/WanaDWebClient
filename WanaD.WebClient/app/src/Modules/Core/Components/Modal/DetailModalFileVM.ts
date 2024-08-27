
import FsUtility from 'Lib/Fs.SmartClient.Client/FsUtility';
import LanguageData from '../../../Core/Scripts/AppServiceContract/LanguageData';
import TabViewModel from 'Lib/Fs.SmartClient.Client/TabViewModel';
import UploadFileAppService from '../../Scripts/AppServiceContract/UploadFileAppService';
import { fs } from "Config/FsConfig";
import DocSearchVMBase from 'Lib/Fs.SmartClient.Client/DocSearchVMBase';
import FileUploadDocEditorVM from './FileUploadDocEditorVM';
import LanguageAppService from '../../../Core/Scripts/AppServiceContract/LanguageAppService';

export default class DetailModalFileVM extends DocSearchVMBase<FileUploadDocEditorVM> {
    LangList: LanguageData[];
    LangCode: string;
    public UploadFileAppService: UploadFileAppService;
    public ServiceBaseUrl: string;
    public Obj: Object = { File: null}

    constructor() {
        super(FileUploadDocEditorVM)
        this.UploadFileAppService = this.container.get(UploadFileAppService) as UploadFileAppService;
        this.ServiceBaseUrl = fs.Config.ServiceBaseUrl;

    }



    async OnSelectFileAsync(selectedFiles) {
        console.log("pass")
        console.log(selectedFiles)

        var files = selectedFiles.target.files;
        for (var x = 0; x < files.length; x++) {
            var data = new FormData();
            data.append("file" + x, files[x]);
            var File = await $.ajax({
                type: "POST",
                url: this.ServiceBaseUrl + "modules/Core.AppService/UploadFileAppService/UpLoad",
                contentType: false,
                processData: false,
                data: data,
                async: false,
            });
            this.Obj = { ...this.Obj, File: File.FileName }
            console.log(this.Obj)
        }
    }

}
