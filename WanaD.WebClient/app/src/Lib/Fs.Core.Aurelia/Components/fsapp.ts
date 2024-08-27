/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-inferrable-types */
//import {
//  Router,
//  RouterConfiguration,
//  RouteConfig,
//  NavModel,
//  Redirect,
//} from "aurelia-router";
//import { autoinject, Container, Aurelia } from "aurelia-framework";
import { User, UserManager } from "oidc-client-ts";
//import { I18N } from "aurelia-i18n";
import { fs } from "../../../Config/FsConfig";
import config from "../../../Config/open-id-connect-configuration";
import { FsAjaxSettings } from "./FsAjaxSettings";
import { IRoute, IRouteableComponent, IRouter } from "@aurelia/router";
import Aurelia, { IContainer, Registration, resolve } from "aurelia";
import OidcConfig from "../../../Config/open-id-connect-configuration";
import { I18N } from "@aurelia/i18n";


export class FsApp implements IRouteableComponent {
    static title: string = "FsAurelia";
    container: IContainer = resolve(IContainer);
    router: IRouter = resolve(IRouter);
    
    async attached() {
        await this.Init();
    }
    async Init() {
        var self = this;

        this.userManager = new UserManager(OidcConfig.Config);
        this.userManager
            .clearStaleState()
            .then(() => {
                console.log("clearState success");
            })
            .catch((e) => {
                console.log("clearStateState error", e.message);
            });
        this.container.register(
            Registration.instance(UserManager, this.userManager)
        );

        this.userManager.events.addUserLoaded(() => self.getUser());
        this.userManager.events.addUserUnloaded(() => self.getUser());

        this.getUser();
        //this.openIdConnect.observeUser((user: User) => {
        //    Container.instance.unregister("user");
        //    Container.instance.registerInstance("user", user);
        //    if (user != null) {
        //      self.user = user;
        //      localStorage.removeItem("UserExpireTime");
        //      localStorage.setItem("UserExpireTime", user.expires_at.toString());
        //      console.log("User " + JSON.stringify(user));
        //      console.log("Will timeout in " + user.expires_at);
        //    }
        //  });

        //  this.openIdConnect.getUser().then(function (user) {
        //    Container.instance.unregister("user");
        //    Container.instance.registerInstance("user", user);
        //    self.user = user;
        //  });
        //  this.i18n = i18n;

          if (fs.Config.EnableManualCheckSession)
            this.EnableManualCheckSession = fs.Config.EnableManualCheckSession;

          if (
              this.EnableManualCheckSession &&
              config.Config["CheckSessionInterval"]
          ) {
            setTimeout(
              () => self.checkSilentLogin(self),
              config.Config["CheckSessionInterval"] * 1000
            );
        }


          $(document).ajaxSend(function (event, jqXhr, settings: FsAjaxSettings) {
            if (settings.showLoading) {
              self.IncreaseLoadingCount();
            }

              var user = self.container.get("user");
            if (user != null) {
              jqXhr.setRequestHeader("Authorization", "Bearer " + user['access_token']);
            }
            var locale = sessionStorage.getItem("CurrentSystemLocale");
            if (locale != null) {
              jqXhr.setRequestHeader("Accept-Language", locale);
            }
          });

          $(document).keydown(function () {
            if (self.isLoading) {
              return false;
            } else {
              return true;
            }
          });

          $(document).ajaxComplete(function (event, jqXhr, settings: FsAjaxSettings) {
            if (settings.showLoading) {
              self.DecreaseLoadingCount();
            }
          });
    }


    static routes: IRoute[] = [
    ]
    isLoading: boolean = false;
    EnableManualCheckSession: boolean = false;
    ajaxCount: number = 0;

    user: User;
    userManager: UserManager;
    public i18n: I18N;
    aurelia: Aurelia;
    public IsUserActive: boolean = false;
    public RequiredReauthentication: string = "false";

    getUser() {
        var self = this;
        this.userManager.getUser().then(user => {
            this.container.register(
                Registration.instance("user", user)
            );
            if (user != null) {
                self.user = user;
                localStorage.removeItem("UserExpireTime");
                localStorage.setItem("UserExpireTime", user.expires_at.toString());
                console.log("User " + JSON.stringify(user));
                console.log("Will timeout in " + user.expires_at);
            }



        });
    }

    //constructor(openIdConnect: OpenIdConnect, i18n: I18N) {
    //  var self = this;
    //  this.openIdConnect = openIdConnect;
    //  this.openIdConnect.userManager
    //    .clearStaleState()
    //    .then(() => {
    //      console.log("clearState success");
    //    })
    //    .catch((e) => {
    //      console.log("clearStateState error", e.message);
    //    });

    //  this.aurelia = Container.instance.get(Aurelia);
    //  this.openIdConnect.observeUser((user: User) => {
    //    Container.instance.unregister("user");
    //    Container.instance.registerInstance("user", user);
    //    if (user != null) {
    //      self.user = user;
    //      localStorage.removeItem("UserExpireTime");
    //      localStorage.setItem("UserExpireTime", user.expires_at.toString());
    //      console.log("User " + JSON.stringify(user));
    //      console.log("Will timeout in " + user.expires_at);
    //    }
    //  });

    //  this.openIdConnect.getUser().then(function (user) {
    //    Container.instance.unregister("user");
    //    Container.instance.registerInstance("user", user);
    //    self.user = user;
    //  });
    //  this.i18n = i18n;

    //  if (fs.Config.EnableManualCheckSession)
    //    this.EnableManualCheckSession = fs.Config.EnableManualCheckSession;

    //  if (
    //      this.EnableManualCheckSession &&
    //      config.Config["CheckSessionInterval"]
    //  ) {
    //    setTimeout(
    //      () => self.checkSilentLogin(self),
    //      config.Config["CheckSessionInterval"] * 1000
    //    );
    //  }

    //  $(document).ajaxSend(function (event, jqXhr, settings: FsAjaxSettings) {
    //    if (settings.showLoading) {
    //      self.IncreaseLoadingCount();
    //    }

    //    var user = Container.instance.get("user");
    //    if (user != null) {
    //      jqXhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
    //    }
    //    var locale = sessionStorage.getItem("CurrentSystemLocale");
    //    if (locale != null) {
    //      jqXhr.setRequestHeader("Accept-Language", locale);
    //    }
    //  });

    //  $(document).keydown(function () {
    //    if (self.isLoading) {
    //      return false;
    //    } else {
    //      return true;
    //    }
    //  });

    //  $(document).ajaxComplete(function (event, jqXhr, settings: FsAjaxSettings) {
    //    if (settings.showLoading) {
    //      self.DecreaseLoadingCount();
    //    }
    //  });
    //}

    IncreaseLoadingCount() {
      this.IsUserActive = true;
      this.isLoading = true;
      this.ajaxCount += 1;
    }

    DecreaseLoadingCount() {
      this.ajaxCount -= 1;
      if (this.ajaxCount == 0) {
        this.isLoading = false;
      }
    }

    checkSilentLogin(app) {
      var ts = Math.round(new Date().getTime() / 1000);
      console.log("Current time " + ts);
      console.log(
        "Check session " +
          config.Config["CheckSessionInterval"]
      );

      if (app.IsUserActive) {
        app.openIdConnect.userManager.signinSilent().then((user: any) => {
          console.log("SILENT LOGIN");
          app.IsUserActive = false;
        });
      } else {
        console.log("Not Silent Login");
      }
      setTimeout(
        () => app.checkSilentLogin(app),
        config.Config["CheckSessionInterval"] * 1000
      );
    }
    //configureRouter(config: RouterConfiguration, router: Router): void {
    //  this.router = router;

    //  this.openIdConnect.configure(config);
    //}
}
