/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-var */
import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import UserSearchVM from "./UserSearchVM";
import PermissionVM from "./PermissionVM";
import { IRoute, IRouteableComponent, IRouter } from "@aurelia/router";
import { IValidationController } from "@aurelia/validation-html";
import { newInstanceForScope, resolve } from "@aurelia/kernel";


import template from './UserGroupDetailEditorView.html';
import { customElement } from 'aurelia';
import UserData01 from "Modules/Core/Scripts/AppServiceContract/UserData01";
import ManageUserGroupAppService from "Modules/Core/Scripts/AppServiceContract/ManageUserGroupAppService";
import GroupUpdateRequest from "Modules/Core/Scripts/AppServiceContract/GroupUpdateRequest";
import { IValidationRules } from "@aurelia/validation";

@customElement({
    name: 'UserGroupDetailEditorView',
    template
})
export default class UserGroupDetailEditorVM extends EditorVMBase implements IRouteableComponent {
    Code: string;

    UserSearchVM: UserSearchVM;
    PermissionVM: PermissionVM;
    UserSearchView
    PermissionView
    ValidationController = resolve(
        newInstanceForScope(IValidationController)
    ) as IValidationController;
    ValidationRules = resolve(IValidationRules) as IValidationRules;
    constructor() {
        super();

        var self = this;
        self.IsActive = false;

        this.ValidationRules.on(this)
            .ensure('Name').required().withMessage('Name is required.');

        this.IsCreate = true;
    }

    async loading(params) {
        
        await this.LoadAsync(params.id);
    }

    async LoadAsync(id: string) {
        var self = this;
        if (id != null && id != 'undefined') {
            this.Id = id;
            self.Code = id;
            await self.LoadDataAsync();
            await self.PrepareChildVMsAsync();
            self.IsCreate = false;
            self.IsEditMode = true;
        } else {
            this.BeginEdit();
        }
    }
    async PrepareChildVMsAsync() {
        super.PrepareChildVMsAsync();

        if (this.Code != null && this.Code != "" && this.Code != undefined && this.Code != "00000000-0000-0000-0000-000000000000") {
            this.UserSearchVM = this.container.get(UserSearchVM);
            this.PermissionVM = this.container.get(PermissionVM);
            this.UserSearchVM.Load(this.Code);
            this.PermissionVM.Load(this.Code);
            this.AddChildNode(this.UserSearchVM);
            this.AddChildNode(this.PermissionVM);


        }
    }
    /*async PrepareChildVMsAsync() {
        await super.PrepareChildVMsAsync();

        if (this.Code != null && this.Code != "" && this.Code != undefined && this.Code != "00000000-0000-0000-0000-000000000000") {
       *//*     this.InformationEditorVM = this.container.get(InformationEditorVM);
         this.InformationEditorVM.Init(this.Code);
         this.InformationView = (await import("./InformationView.html")).default;
         this.AddChildNode(this.InformationEditorVM);*//*

    this.UserSearchVM = this.container.get(UserSearchVM);
    this.UserSearchVM.Init(this.Code);
    this.UserSearchView = (await import("./UserView.html")).default;
    this.AddChildNode(this.UserSearchVM);

    this.PermissionVM = this.container.get(PermissionVM);
    this.PermissionVM.Init(this.Code);
    this.PermissionView = (await import("./PermissionView.html")).default;
    this.AddChildNode(this.PermissionVM);
}
}*/

    Name: string;
    IsActive: boolean;
    IsCreate: boolean;
    IsEditMode: boolean;
    Id: string;
    router: IRouter = resolve(IRouter)


    async LoadOriginalSourceAsync(originalSource: UserData01) {
        this.Name = originalSource.Name;
        this.IsActive = originalSource.IsActive;
        this.HasOriginalSource = true;
    }

    async SaveOriginalSourceAsync(originalSource: UserData01) {
        originalSource.Name = $.trim(this.Name);
        originalSource.IsActive = this.IsActive;
    }

    SaveData() {
        var self = this;
        self.ValidationController.validate({ object: self }).then(async result => {
            if (result.valid) {
                await this.SaveAsync(null, null);
            }
        });

    }

    async SaveAsync(doneCallback: () => void, failCallback: (error) => void) {
        var self = this;

        var request = this.CreateRequest();

        var service = this.container.get(ManageUserGroupAppService) as ManageUserGroupAppService;
        if (this.HasOriginalSource) {
            try {
                await service.UpdateAsync(request);
                FsUtility.AlertModal("The item has been updated successfully", 2, 1, async function (click) {
                    if (doneCallback != null) {
                        doneCallback();
                    }
                    await self.EndEditAsync();

                });
            } catch (error) {
                FsUtility.CommonErrorHandler(error);
            }
        } else {
            try {
                var result = await service.AddAsync(request);
                if (self.IsCreate) {
                    FsUtility.AlertModal("The item has been saved successfully", 2, 1, async function (click) {
                        if (click == true) {
                            /*self.Router.navigateToRoute("UserGroupEdit", { id: encode });*/

                            self.router.load("Modules/Core/UserGroupDetailPage/" + result);
                        }
                        await self.EndEditAsync();
                    });
                }
            } catch (error) {
                FsUtility.CommonErrorHandler(error);
            }
        }
    }

    async LoadDataAsync() {
        var self = this;
        var service = this.container.get(ManageUserGroupAppService) as ManageUserGroupAppService;

        try {
            var result = await service.LoadAsync(self.Id);
            await self.SetOriginalSourceAsync(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    CreateRequest(): GroupUpdateRequest {
        return {
            Name: $.trim(this.Name),
            IsActive: this.IsActive,
            userUID: this.Id
        }
    }

    async CancelAsync() {
        var self = this;
        if (self.IsCreate)
            this.router.load("Modules/Core/ManageUserGroupPage");
        else {
            await this.EndEditAsync();
            if (this.HasOriginalSource)
                await this.LoadOriginalSourceAsync(this.OriginalSource);
        }
    }
    Back(): void {
        this.router.load("Modules/WanaD/ManageUserGroupPage");
    }
}
