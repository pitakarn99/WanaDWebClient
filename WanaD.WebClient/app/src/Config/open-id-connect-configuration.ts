/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-var-requires */
 import { UserManagerSettings, WebStorageStateStore } from "oidc-client-ts";
 import { fs } from "./FsConfig";

 export default class OidcConfig {
     static get Config(): UserManagerSettings {
     return window['_oidc-config'];
   }
     static set Config(config: UserManagerSettings) {
     window['_oidc-config'] = config;
   }

   static async InitConfig() {

     const oidcConfigFile = require('Config/open-id-connect-configuration.json');
     var oidcResponse = await fetch(oidcConfigFile.default);
     var oidcResult = await oidcResponse.json();
       console.log('JSON loaded via fetch', oidcResult.userManagerSettings);

       var userStore = oidcResult.userManagerSettings.userStore;
     if (userStore.type == "WebStorageStateStore") {
       var storage = new WebStorageStateStore(
         {
           prefix: userStore.prefix,
           store: eval(userStore.store)
         });
         oidcResult.userManagerSettings.userStore = storage;
     }

       this.Config = $.extend(this.Config, oidcResult.userManagerSettings);
   }
 }
