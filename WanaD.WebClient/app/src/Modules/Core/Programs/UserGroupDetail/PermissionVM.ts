/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-var */
/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import ACLTemplateCategoryData from "../../../Core/Scripts/ACLTemplateCategoryData";
import ACLTemplateSearchParameter from "../../../Core/Scripts/AppServiceContract/ACLTemplateSearchParameter";
import ACLTemplateSearchCriteria from "../../../Core/Scripts/ACLTemplateSearchCriteria";
import ACLTemplateUpdateParameter from "../../../Core/Scripts/ACLTemplateUpdateParameter";
import ACLTemplateData from "../../../Core/Scripts/ACLTemplateData";
import ResourceData from "../../../Core/Scripts/ResourceData";
import ApplicationData01 from "../../../Core/Scripts/AppServiceContract/ApplicationData01";
import { fs } from "Config/FsConfig";
import ACLTemplateAppService from "../../../Core/Scripts/AppServiceContract/ACLTemplateAppService";
import ModuleData from "../../../Core/Scripts/AppServiceContract/ModuleData";
import TabViewModel from "Lib/Fs.SmartClient.Client/TabViewModel";
import { IContainer, IObserverLocator, resolve, transient, watch } from "aurelia";

import template from './PermissionView.html';
import { customElement } from 'aurelia';

@customElement({
    name: 'PermissionVM',
    template
})
export default class PermissionVM {

    container: IContainer = resolve(IContainer);
    Categories: Array<PermissionCategoryVM>
    Temp: Array<ACLTemplateCategoryData>
    UserUID: string
    IsEditing: boolean = false;

    ModuleList: ModuleData[];
    selectedModule: ModuleData;
    get SelectedModule(): ModuleData {
        return this.selectedModule;
    }
    set SelectedModule(value: ModuleData) {
        this.selectedModule = value;

    new Promise(async () => {
      await this.SearchAsync();
    });
    }

    selectedModuleId: string;
    get SelectedModuleId(): string {
        return this.selectedModuleId;
    }
    set SelectedModuleId(value: string) {
        this.selectedModuleId = value;
        if (value != null) {
            this.SelectedModule = this.ModuleList.find(t => t.Id == value);
        }
    }

    ModuleWidget: any;

    constructor() {
     
    }
    Load(code) {
        var self = this;
        self.Categories = [];
        self.Temp = [];
        self.UserUID = code;
        self.LoadAsync(code);
        self.LoadApplicationListAsync();
    }
 

    bind() {
        var self = this;
        $(document).ajaxSend(function (event, jqXhr) {
            var user = self.container.get("user");
            if (user != null) {
                jqXhr.setRequestHeader('Authorization', 'Bearer ' + user['access_token']);
            }
        });
    }

    BeginEdit() {
        if (this.IsEditing == true) return;
        this.IsEditing = true;
    }

    EndEdit() {
        if (this.IsEditing == false) return;
        this.IsEditing = false;
    }

  async LoadAsync(code: string) {
        var self = this;
        if (code != null && code != 'undefined') {
      await self.SearchAsync();
        }
    }

  async LoadApplicationListAsync() {
        var self = this;
        var service = this.container.get(ACLTemplateAppService) as ACLTemplateAppService;
    try {
      var result = await service.LoadModuleListAsync();
            var currentSystem = new ModuleData();
            currentSystem.Id = "0";
            currentSystem.Name = "Current System";
        currentSystem.BaseUrl = fs.Config.ServiceBaseUrl;
            result.unshift(currentSystem);
        self.ModuleList = result;
    } catch (error) {
      FsUtility.CommonErrorHandler(error);
    }
  }

  async SearchAsync() {
        var req = this.CreateCriteria();
        req.PagingCriteria = null;
        req.SortingCriteria = null;
      var service = this.container.get(ACLTemplateAppService) as ACLTemplateAppService;
        if (this.SelectedModule != null) {
            service.Init({ serverBaseUrl: this.SelectedModule.BaseUrl });
        }

    try {
      var result = await service.FindTemplateAsync(req);
      await this.PrepareChildVMsAsync(result);
    } catch (error) {
      FsUtility.CommonErrorHandler(error);
    }
  }

  async PrepareChildVMsAsync(result: Array<ACLTemplateCategoryData>) {
        this.Categories = [];
        for (var i in result) {
            var categoryData = result[i];
            var newCategoryVM = this.container.get(PermissionCategoryVM);
            newCategoryVM.Parent = this;
      await newCategoryVM.LoadOriginalSourceAsync(categoryData);
            this.Categories.push(newCategoryVM);
        }
        this.Temp = result;
    }

    CreateCriteria() {
        var req = new ACLTemplateSearchParameter();
        var cri = new ACLTemplateSearchCriteria();

        cri.UserUID = this.UserUID;
        req.Criteria = cri;
        return req;
    }

  async SaveAsync() {
        var req = this.CreateCriteria()
        var self = this;
        var items = new ACLTemplateUpdateParameter;
        items.UserUID = self.UserUID;
        items.Items = self.SelectedItems;

      var service = this.container.get(ACLTemplateAppService) as ACLTemplateAppService;
        if (this.SelectedModule != null) {
            service.Init({ serverBaseUrl: this.SelectedModule.BaseUrl });
        }

    try {
      await service.SaveTemplateAsync(items);
      var result = await service.FindTemplateAsync(req);
                        self.Temp = result;


                FsUtility.AlertModal("The item has been saved successfully", 1, 1);

                self.EndEdit();
    } catch (error) {
      FsUtility.CommonErrorHandler(error);
    }

    }

    Cancel() {
        for (var i = 0; i < this.Categories.length; i++) {
            var categoryVM = this.Categories[i];
            for (var j = 0; j < categoryVM.Templates.length; j++) {
                var templateVM = categoryVM.Templates[j];
                var isCheck = this.GetTempValue(templateVM.Id);
                var ResourceId = this.GetTempResourceValue(templateVM.Id);
                templateVM.ResourceId = ResourceId;
                templateVM.IsCheck = isCheck;
            }
        }
        this.EndEdit();
    }

    GetTempValue(aclTemplateId: string): boolean {
        for (var i = 0; i < this.Temp.length; i++) {
            var categoryTemp = this.Temp[i];
            for (var j = 0; j < categoryTemp.ACLTemplateDatas.length; j++) {
                var templateTemp = categoryTemp.ACLTemplateDatas[j] as ACLTemplateData;
                if (templateTemp.Id == aclTemplateId) {
                    return templateTemp.IsCheck;
                }
            }
        }
        return false;
    }

    GetTempResourceValue(aclTemplateId: string): [] {
        for (var i = 0; i < this.Temp.length; i++) {
            var categoryTemp = this.Temp[i];
            for (var j = 0; j < categoryTemp.ACLTemplateDatas.length; j++) {
                var templateTemp = categoryTemp.ACLTemplateDatas[j] as ACLTemplateData;
                if (templateTemp.Id == aclTemplateId) {
                    return templateTemp.ResourceUID;
                }
            }
        }
        return null;
    }

    //@watch('Categories')
    get SelectedItems() {
        var result = [];
        for (var i = 0; i < this.Categories.length; i++) {
            var categoryVM = this.Categories[i];

            for (var j = 0; j < categoryVM.Templates.length; j++) {
                var templateVM = categoryVM.Templates[j];
                if (templateVM.IsCheck) {
                    result.push({
                        ACLTemplateId: templateVM.Id,
                        ResourceUId: templateVM.ResourceId
                    });
                }
            }
        }
        return result;
    }
}

@transient
class PermissionCategoryVM {
    Parent: PermissionVM;
    Templates: Array<PermissionTemplateVM>
    Id: string
    Name: string
    IsCheckCategory: boolean
    IsNotifiedByChildren: boolean;
    bindingEngine: IObserverLocator;

    container: IContainer = resolve(IContainer);
    constructor() {
        var self = this;
        this.Templates = [];

        this.IsNotifiedByChildren = false;
        this.IsCheckCategory = false;
        this.bindingEngine = this.container.get(IObserverLocator) as IObserverLocator;

        this.bindingEngine.getObserver(this, 'IsCheckCategory')
            .subscribe({
                handleChange: (newValue, oldValue) => {
                    if (self.IsNotifiedByChildren == true) {

                        if (newValue == true) {

                            for (var i = 0; i < self.Templates.length; i++)
                                self.Templates[i].IsCheck = true;
                        }
                    } else {

                        if (newValue == false) {

                            for (var i = 0; i < self.Templates.length; i++)
                                self.Templates[i].IsCheck = false;
                        }
                    }
                }
            });
    }

  async LoadOriginalSourceAsync(originalSoruce: ACLTemplateCategoryData) {

        this.Id = originalSoruce.Id;
        this.Name = originalSoruce.Name;

        this.Templates = [];

        var self = this;
        this.IsCheckCategory = false;
        for (var i in originalSoruce.ACLTemplateDatas) {
            var templateData = originalSoruce.ACLTemplateDatas[i];
            var templateVM = this.container.get(PermissionTemplateVM);
            templateVM.Parent = this;
            templateVM.OnIsCheckChange = function (value) {
                self.UpdateIsCheck(value);
            };
      await templateVM.LoadOriginalSourceAsync(templateData);
            this.Templates.push(templateVM);
        }

        this.UpdateIsCheck(null);
    }

    UpdateIsCheck(value) {
        var self = this;
        self.IsNotifiedByChildren = false;

        var isCheckChild = true;
        for (var i = 0; i < self.Templates.length; i++) {
            if (self.Templates[i].IsCheck == false) {
                isCheckChild = false;
                self.IsNotifiedByChildren = true;
                break;
            }
        }

        self.IsCheckCategory = isCheckChild;
    }
}

@transient
class PermissionTemplateVM {
    Id: string
    Name: string
    ResourceType: string
    IsCheck: boolean
    IsRequireResourceType: boolean
    ResourceList: Array<ResourceData>;
    ResourceId: [];

    Parent: PermissionCategoryVM;

    OnIsCheckChange: (value) => void
    bindingEngine: IObserverLocator;

    container: IContainer = resolve(IContainer);
    constructor() {
        var self = this;

        this.bindingEngine = this.container.get(IObserverLocator) as IObserverLocator;

        this.bindingEngine.getObserver(this, 'IsCheck')
            .subscribe({
                handleChange: (newValue, oldValue) => {
                    self.OnIsCheckChange(this);
                }
            });
    }

  async LoadOriginalSourceAsync(originalSource: ACLTemplateData) {

        this.Id = originalSource.Id;
        this.Name = originalSource.Name;
        this.ResourceType = originalSource.ResourceType;
        this.IsCheck = originalSource.IsCheck;
        this.IsRequireResourceType = originalSource.IsRequireResourceType;
        this.ResourceId = originalSource.ResourceUID;

        if (originalSource.IsRequireResourceType) {
      await this.FindResourceAsync();
        }
    }

  async FindResourceAsync() {
        var self = this;

      var service = this.container.get(ACLTemplateAppService) as ACLTemplateAppService;
        if (this.Parent.Parent.SelectedModule != null) {
            service.Init({ serverBaseUrl: this.Parent.Parent.SelectedModule.BaseUrl });
        }

    try {
      var result = await service.LoadResourceAsync(this.ResourceType);
            self.ResourceList = result;
    } catch (error) {
      FsUtility.CommonErrorHandler(error);
    }
}
}
