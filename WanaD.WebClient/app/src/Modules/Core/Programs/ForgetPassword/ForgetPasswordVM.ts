/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-this-alias */
import TabViewModel from "Lib/Fs.SmartClient.Client/TabViewModel";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import ChangePasswordAppService from "../../Scripts/AppServiceContract/ChangePasswordAppService";
import { UserManager } from "oidc-client-ts";
import template from './ForgetPasswordView.html';
import { customElement } from 'aurelia';

@customElement({
    name: 'ForgetPasswordView',
    template
})
export default class ForgetPasswordVM extends TabViewModel {

    public UserManager: UserManager;
    public Email: string;

    constructor() {
        super();
        this.UserManager = this.container.get(UserManager);
    }

    public Cancel() {
        window.history.back();
    }

    public async SubmitAsync() {
        var self = this;

        var service = this.container.get(ChangePasswordAppService) as ChangePasswordAppService;
        try {
            await service.SendForgetPasswordEmailAsync(this.Email);
            FsUtility.AlertModal("Send reset password successful", 2, 1, function (result) {
                window.history.back();
            });
        } catch (error) {
            FsUtility.AlertErrorMessage(error);
        }
    }
}
