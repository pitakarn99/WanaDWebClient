/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import TabViewModel from "Lib/Fs.SmartClient.Client/TabViewModel";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import ChangePasswordAppService from "../../Scripts/AppServiceContract/ChangePasswordAppService";
import { User, UserManager } from "oidc-client";
import ActivateTokenRequest from "../../Scripts/AppServiceContract/ActivateTokenRequest";
import CreatePasswordData from "../../Scripts/AppServiceContract/CreatePasswordData";
import ActivateUserAppService from "../../Scripts/AppServiceContract/ActivateUserAppService";
import { IRouter } from "@aurelia/router";
import template from './CreatePasswordView.html';
import { customElement, resolve } from 'aurelia';

@customElement({
    name: 'CreatePasswordView',
    template
})
export default class ChangePasswordVM extends TabViewModel {

    public UserManager: UserManager;
    router: IRouter = resolve(IRouter);
    constructor() {
        super();
        this.UserManager = this.container.get(UserManager);
  }

  public IsFromLogin: boolean = false;
  public ResourceId: string;
  public TokenKey: string;

  public NewPassword: string;
  public ConfirmPassword: string;

  public User: User;

    async loading(params, route) {

    var self = this;

    this.ResourceId = params.ResourceId;
    this.TokenKey = params.TokenNo;

    var request = new ActivateTokenRequest();
    request.ResourceUID = this.ResourceId;
    request.TokenKey = this.TokenKey;
    request.IsChangePassword = true;

    var service = this.container.get(ChangePasswordAppService) as ChangePasswordAppService;
    try {
      var result = await service.CheckTokenAsync(request);
      if (!result) {
        window.history.back();
      }
    } catch (error) {
      FsUtility.AlertErrorMessage(error);
      window.history.back();
    }
  }

  async SubmitAsync() {
    var self = this;
    if (this.NewPassword != this.ConfirmPassword) {
      FsUtility.AlertModal("Password and confirm password does not match", 1, 2);
      return;
    }
    var service = this.container.get(ActivateUserAppService) as ActivateUserAppService;
    var request = new CreatePasswordData();

    request.Password = this.NewPassword;
    request.TokenKey = this.TokenKey;
    request.UserId = this.ResourceId;
    try {
      await service.CreatePasswordAsync(request);
      self.PageRedirect();
    } catch (error) {
      FsUtility.AlertErrorMessage(error);
    }
  }

  Cancel() {
    this.PageRedirect();
  }

  PageRedirect() {
    this.router.load("Modules/Core/CreatePasswordPage/RedirectSuccess");
  }
}
