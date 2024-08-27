/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import TabViewModel from "Lib/Fs.SmartClient.Client/TabViewModel";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import ResetPasswordTokenRequest from "../../Scripts/AppServiceContract/ResetPasswordTokenRequest";
import ChangePasswordUpdateRequest from "../../Scripts/AppServiceContract/ChangePasswordUpdateRequest";
import ResetPasswordUpdateRequest from "../../Scripts/AppServiceContract/ResetPasswordUpdateRequest";
import ChangePasswordAppService from "../../Scripts/AppServiceContract/ChangePasswordAppService";
import { fs } from "Config/FsConfig";
import PasswordRequirementsDisplayData from "../../Scripts/AppServiceContract/PasswordRequirementsDisplayData";
import { User, UserManager } from "oidc-client-ts";
import { IRouter } from "@aurelia/router";
import template from './ChangePasswordView.html';
import { customElement, resolve } from 'aurelia';

@customElement({
    name: 'ChangePasswordView',
    template
})
export default class ChangePasswordVM extends TabViewModel {

  public IsFromLogin: boolean = false;
  public ResourceId: string;
  public TokenKey: string;

  public OldPassword: string;
  public NewPassword: string;
  public ConfirmPassword: string;

    public UserManager: UserManager;
  public User: User;
  public PasswordRequirementDisplayData: PasswordRequirementsDisplayData;
    router: IRouter = resolve(IRouter);
  get IsShowPasswordRequirements() {
    return (fs.Config.IsShowPasswordRequirements && (
      this.PasswordRequirementDisplayData.MinLength > 0 ||
      this.PasswordRequirementDisplayData.MaxNeighboringCharacter > 0 ||
      this.PasswordRequirementDisplayData.MaxRepeatSameCharacter > 0 ||
      this.PasswordRequirementDisplayData.MinUniqueCharacters > 0 ||
      this.PasswordRequirementDisplayData.RequireDigit == true ||
      this.PasswordRequirementDisplayData.RequireLowercase == true ||
      this.PasswordRequirementDisplayData.RequirePunctuation == true ||
      this.PasswordRequirementDisplayData.RequireUppercase == true
    ));
  }

    constructor() {
      super();
      this.UserManager = this.container.get(UserManager);
  }

  async loading(params, route) { //called from aurelia system แก้ไขชื่อไม่ได้

    var self = this;

    if (typeof route != "undefined") {
        if (params.ResourceId != null && params.TokenNo != null) {
        this.ResourceId = params.ResourceId;
        this.TokenKey = params.TokenNo;

        var request = new ResetPasswordTokenRequest();
        request.ResourceUID = this.ResourceId;
        request.TokenKey = this.TokenKey;

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
      } else {
          this.UserManager.getUser().then(function (result) {
          self.User = result;
          if (self.User == null) {
            window.history.back();
          }
        });
      }
    }
    await this.LoadPasswordRequirementDisplayDataAsync();
  }

  async SubmitAsync() {
    var self = this;
    var service = this.container.get(ChangePasswordAppService) as ChangePasswordAppService;
    if (this.IsFromLogin) {
      var request = new ChangePasswordUpdateRequest();
      request.OldPassword = this.OldPassword;
      request.NewPassword = this.NewPassword;
      request.ConfirmPassword = this.ConfirmPassword;
      try {
        await service.ChangePasswordAsync(request);
        self.PageRedirect();
      } catch (error) {
        FsUtility.AlertErrorMessage(error);
      }
    } else {
      var resetRequest = new ResetPasswordUpdateRequest();
      resetRequest.TokenKey = this.TokenKey;
      resetRequest.UserUID = this.ResourceId;
      resetRequest.NewPassword = this.NewPassword;
      resetRequest.ConfirmPassword = this.ConfirmPassword;

      try {
        await service.ResetPasswordAsync(resetRequest);
        self.PageRedirect();
      } catch (error) {
        FsUtility.AlertErrorMessage(error);
      }
    }
  }

  async LoadPasswordRequirementDisplayDataAsync() {
    var self = this;
    var service = this.container.get(ChangePasswordAppService) as ChangePasswordAppService;

    try {
      var result = await service.LoadPasswordRequirementsDataAsync();
      this.PasswordRequirementDisplayData = result;
    
    } catch (error) {
      FsUtility.AlertErrorMessage(error);
    }
  }

  Cancel() {
    window.history.back();
  }

  PageRedirect() {

    this.router.load("Modules/Core/ChangePasswordPage/RedirectSuccess");
  }
}
