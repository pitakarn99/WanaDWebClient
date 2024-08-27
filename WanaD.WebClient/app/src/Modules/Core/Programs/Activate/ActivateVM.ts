/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import TabViewModel from "Lib/Fs.SmartClient.Client/TabViewModel";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import ActivateTokenRequest from "../../Scripts/AppServiceContract/ActivateTokenRequest";
import ActivateUserAppService from "../../Scripts/AppServiceContract/ActivateUserAppService";
import ActivateData from "../../Scripts/AppServiceContract/ActivateData";
import { User, UserManager } from "oidc-client-ts";
import { IRouter } from "@aurelia/router";
import template from './ActivateView.html';
import { customElement, resolve } from 'aurelia';

@customElement({
    name: 'ActivateView',
    template
})
export default class ActivateVM extends TabViewModel {

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

    public IsSuccess: boolean = false;
    public User: User;

    async loading(params, route) {

        var self = this;

        this.ResourceId = params.ResourceId;
        this.TokenKey = params.TokenNo;

        var request = new ActivateTokenRequest();
        request.ResourceUID = this.ResourceId;
        request.TokenKey = this.TokenKey;
        request.IsChangePassword = false;

      var service = this.container.get(ActivateUserAppService) as ActivateUserAppService;
      try {
        var result = await service.CheckTokenAsync(request);
        if (!result) {
          window.history.back();
        }
        var data = new ActivateData();
        data.TokenKey = self.TokenKey;
        data.UserId = self.TokenKey;
        await service.ActivateUserAsync(data);
        self.IsSuccess = true;    
      } catch (error) {
        FsUtility.AlertErrorMessage(error);
        window.history.back();
      }        
    }
}
