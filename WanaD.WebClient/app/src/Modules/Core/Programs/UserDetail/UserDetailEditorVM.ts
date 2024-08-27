/* eslint-disable no-async-promise-executor */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import { fs } from "Config/FsConfig";
import { IRouter } from "@aurelia/router";
import { IValidationController } from "@aurelia/validation-html";
import { IValidationRules } from "@aurelia/validation";
import { newInstanceForScope } from "@aurelia/kernel";
import UserData01 from "../../Scripts/AppServiceContract/UserData01";
import ManageUserAppService from "../../Scripts/AppServiceContract/ManageUserAppService";
import UserUpdateRequest from "../../Scripts/AppServiceContract/UserUpdateRequest";
import template from './UserDetailEditorView.html';
import { customElement, resolve } from 'aurelia';

@customElement({
    name: 'UserDetailEditorView',
    template
})
export default class UserDetailEditorVM extends EditorVMBase {
    Code: string;
    Name: string;
    Email: string;
    Login: string;
    IsActive: boolean;
    IsLocked: boolean;
    IsGroup: boolean;
    Password: string;
    PasswordExpireDate: Date;
    AuthType: any;
    IsCreate: boolean;
    IsEditMode: boolean;
    Id: string;
    ExternalUserId: string;
    Router: IRouter = resolve(IRouter);
    IsRequirePassword: boolean = false;
    Provider: string;
    ValidationController = resolve(
        newInstanceForScope(IValidationController)
    ) as IValidationController;
    ValidationRules = resolve(IValidationRules) as IValidationRules;

    constructor() {
        super();

        var self = this;
        
        self.IsActive = true;

        this.ValidationRules.on(this)
            .ensure('Name').required().withMessage('Name is required.')
            .ensure('Email').required().withMessage('Email is required.')
            .ensure('Login').required().withMessage('Login is required.');

        this.IsCreate = true;
    }

    async load(params) {
        this.Id = params.id;
        await this.LoadAsync(params.id);
    }

    async LoadAsync(code: string) {
        var self = this;
        if (code != null && code != 'undefined') {
            self.Code = code;
            await self.LoadDataAsync();
            self.IsCreate = false;
            self.IsEditMode = true;
        } else {
            this.BeginEdit();
        }
    }

    Back(): void {
        this.Router.load("Modules/Core/ManageUserPage");
    }

    async LoadOriginalSourceAsync(originalSource: UserData01) {
        this.Name = originalSource.Name;
        this.Email = originalSource.Email;
        this.Login = originalSource.Login;
        this.IsActive = originalSource.IsActive;
        this.IsLocked = originalSource.IsLocked;
        this.AuthType = originalSource.AuthType;
        this.Password = originalSource.Password;
        this.PasswordExpireDate = originalSource.PasswordExpireDate;
        this.IsGroup = originalSource.IsGroup;
        this.ExternalUserId = originalSource.ExternalUserId;
        this.HasOriginalSource = true;
        this.Provider = originalSource.Provider;
    }

    async SaveOriginalSourceAsync(originalSource: UserData01) {
        originalSource.Name = $.trim(this.Name);
        originalSource.Email = $.trim(this.Email);
        originalSource.Login = $.trim(this.Login);
        originalSource.ExternalUserId = $.trim(this.ExternalUserId);
        originalSource.IsActive = this.IsActive;
        originalSource.IsLocked = this.IsLocked;
        originalSource.AuthType = this.IsGroup;
        originalSource.Password = this.Password;
        originalSource.PasswordExpireDate = this.PasswordExpireDate;
        originalSource.Provider = this.Provider;
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

        var request = await this.CreateRequestAsync();

        var service = this.container.get(ManageUserAppService) as ManageUserAppService;
        if (this.HasOriginalSource) {
            try {
                await service.UpdateAsync(request);
                FsUtility.AlertModal("The item has been updated successfully", 2, 1, async function (click) {
                    if (click == true) {
                        if (doneCallback != null) {
                            doneCallback();
                        }

                        await self.EndEditAsync();
                        /*self.Router.navigateToRoute("UserGroupEdit", { id: encode });*/
                    }
                });

            } catch (error) {
                FsUtility.CommonErrorHandler(error);
            }
        } else {
            request.IsGroup = false;
            request.AuthType = 0;
            try {
                var result = await service.AddAsync(request);
                if (self.IsCreate) {
                    FsUtility.AlertModal("The item has been saved successfully", 2, 1, async function (click) {
                        if (click == true) {
                            /*self.Router.navigateToRoute("UserGroupEdit", { id: encode });*/

                            await self.EndEditAsync();
                            self.Router.load("Modules/Core/UserDetailPage/" + result);
                        }
                    });
                }
            } catch (error) {
                FsUtility.CommonErrorHandler(error);
            }
        }
    }

    async LoadDataAsync() {
        var self = this;
        var service = this.container.get(ManageUserAppService) as ManageUserAppService;
        try {
            var result = await service.LoadAsync(self.Id);
            await self.SetOriginalSourceAsync(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    async CreateRequestAsync(): Promise<UserUpdateRequest> {
        return await {
            Name: $.trim(this.Name),
            Email: $.trim(this.Email),
            Login: $.trim(this.Login),
            ExternalUserId: $.trim(this.ExternalUserId),
            IsGroup: this.IsGroup,
            Password: $.trim(this.Password),
            PasswordExpireDate: this.PasswordExpireDate,
            AuthType: this.AuthType,
            IsRequirePassword: this.IsRequirePassword,
            IsActive: this.IsActive,
            UserUID: this.Id,
            Provider: this.Provider,
            IsLocked: this.IsLocked
        }
    }

    async CancelAsync() {
        var self = this;
        if (self.IsCreate)
            self.Router.load("Modules/Core/ManageUserPage");
        else {
            await this.EndEditAsync();
            if (this.HasOriginalSource)
                await this.LoadOriginalSourceAsync(this.OriginalSource);
        }
    }
}
