/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-async-promise-executor */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import LanguageData from '../../../Core/Scripts/AppServiceContract/LanguageData';
import { fs } from "Config/FsConfig";
import DocSearchVMBase from 'Lib/Fs.SmartClient.Client/DocSearchVMBase';
import FileUploadDocEditorVM from './FileUploadDocEditorVM';
import LanguageAppService from '../../../Core/Scripts/AppServiceContract/LanguageAppService';
import UploadFileAppService from '../../Scripts/AppServiceContract/UploadFileAppService';

export default class DetailModalVM extends DocSearchVMBase<FileUploadDocEditorVM> {
    LangList: LanguageData[];
    LangCode: string;
    public UploadFileAppService: UploadFileAppService;
    public ServiceBaseUrl: string;
    public Obj: any = { File: null, LanguageCode: null, IsStructure: true }
    fileType: boolean = false;
    public selectFile: string;
    get FileType(): boolean {
        return this.fileType
    }
    set FileType(IsStructure: boolean) {
        this.fileType = IsStructure
        if (IsStructure == true) {
            this.Obj = { ...this.Obj, LanguageCode: this.LangList[0].Code }
            this.LangCode = this.LangList[0].Code
        }
        else {
            this.Obj = { ...this.Obj, LanguageCode: null }

        }
        this.Obj = { ...this.Obj, IsStructure: !IsStructure }
        console.log(this.Obj)
    }
    Rule;
    SelectFile;
    constructor() {
        super(FileUploadDocEditorVM)
        this.ValidationRules

            .ensure('SelectFile').required().withMessage('Please select file.')
            .on(this);
        this.Rule = this.ValidationRules
            .ensure('SelectFile').required().withMessage('Please select file.')

            .rules;

        this.UploadFileAppService = this.container.get(UploadFileAppService) as UploadFileAppService;
        this.ServiceBaseUrl = fs.Config.ServiceBaseUrl;

      new Promise(async () => {
        await this.GetLangsAsync();
      });
    }

    async GetLangsAsync() {
        var self = this;
        var service = await this.container.get(LanguageAppService) as LanguageAppService;
        self.LangList = await service.FindAllLanguageWithOutDefaultLanguageAsync()
        console.log(self.LangList)
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
            this.SelectFile = files[x];
            console.log(this.Obj)
        }
    }

    SelectLanguage(LanguageCode) {
        this.Obj = { ...this.Obj, LanguageCode }
        console.log(this.Obj)
    }

   //@computedFrom('validationController.errors.length', 'SelectFile')
   get NameErrors() {
       var d = this.getValidateErrors('SelectFile');
     
        return d;
    }

    detached() {
        this.SelectFile=null
    }
}
