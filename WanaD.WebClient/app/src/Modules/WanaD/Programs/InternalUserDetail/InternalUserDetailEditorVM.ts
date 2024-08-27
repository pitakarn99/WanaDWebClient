import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import { IRouter } from "@aurelia/router";
import { IValidationController } from "@aurelia/validation-html";
import { IValidationRules } from "@aurelia/validation";
import { newInstanceForScope } from "@aurelia/kernel";
import template from './InternalUserDetailEditorView.html';
import { customElement, resolve } from 'aurelia';
import UserData01 from "../../../Core/Scripts/AppServiceContract/UserData01";
import ManageUserAppService from "../../../Core/Scripts/AppServiceContract/ManageUserAppService";
import UserUpdateRequest from "../../../Core/Scripts/AppServiceContract/UserUpdateRequest";

@customElement({
    name: 'UserDetailEditorView',
    template
})
export default class InternalUserDetailEditorVM extends EditorVMBase {
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
    Router: IRouter = resolve(IRouter)
    IsRequirePassword: boolean = false;
    Provider: string;
    ValidationController = resolve(newInstanceForScope(IValidationController)) as IValidationController;
    ValidationRules = resolve(IValidationRules) as IValidationRules;

    constructor() {
        super();
        const self = this;
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
        const self = this;
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
        this.Router.load("Modules/WanaD/ManageInternalUserPage");
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
        originalSource.Name = this.Name == null ? null : this.Name.trim();
        originalSource.Email = this.Email == null ? null : this.Email.trim();
        originalSource.Login = this.Login == null ? null : this.Login.trim();
        originalSource.ExternalUserId = this.ExternalUserId == null ? null : this.ExternalUserId.trim();
        originalSource.IsActive = this.IsActive;
        originalSource.IsLocked = this.IsLocked;
        originalSource.AuthType = this.IsGroup;
        originalSource.Password = this.Password;
        originalSource.PasswordExpireDate = this.PasswordExpireDate;
        originalSource.Provider = this.Provider;
    }

    SaveData() {
        const self = this;
        self.ValidationController.validate({ object: self }).then(async result => {
            if (result.valid) {
                await this.SaveAsync(null, null);
            }
        });

    }

    async SaveAsync(doneCallback: () => void, failCallback: (error) => void) {
        const self = this;
        const request = await this.CreateRequestAsync();
        const service = this.container.get(ManageUserAppService) as ManageUserAppService;

        if (this.HasOriginalSource) {
            try {
                await service.UpdateAsync(request);
                FsUtility.AlertModal("The item has been updated successfully", 2, 1, async function (click) {
                    if (click == true) {
                        if (doneCallback != null) {
                            doneCallback();
                        }
                        await self.EndEditAsync();
                    }
                });
            }
            catch (error) {
                FsUtility.CommonErrorHandler(error);
            }
        }
        else {
            request.IsGroup = false;
            request.AuthType = 0;
            try {
                const result = await service.AddAsync(request);
                if (self.IsCreate) {
                    FsUtility.AlertModal("The item has been saved successfully", 2, 1, async function (click) {
                        if (click == true) {
                            await self.EndEditAsync();
                            self.Router.load("Modules/WanaD/InternalUserDetailPage/" + result);
                        }
                    });
                }
            }
            catch (error) {
                FsUtility.CommonErrorHandler(error);
            }
        }
    }

    async LoadDataAsync() {
        const self = this;
        const service = this.container.get(ManageUserAppService) as ManageUserAppService;
        try {
            const result = await service.LoadAsync(self.Id);
            await self.SetOriginalSourceAsync(result);
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }

    async CreateRequestAsync(): Promise<UserUpdateRequest> {
        return await {
            Name: this.Name == null ? null : this.Name.trim(),
            Email: this.Email == null ? null : this.Email.trim(),
            Login: this.Login == null ? null : this.Login.trim(),
            ExternalUserId: this.ExternalUserId == null ? null : this.ExternalUserId.trim(),
            IsGroup: this.IsGroup,
            Password: this.Password == null ? null : this.Password.trim(),
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
        const self = this;
        if (self.IsCreate)
            self.Router.load("Modules/WanaD/ManageInternalUserPage");
        else {
            await this.EndEditAsync();
            if (this.HasOriginalSource)
                await this.LoadOriginalSourceAsync(this.OriginalSource);
        }
    }
}
