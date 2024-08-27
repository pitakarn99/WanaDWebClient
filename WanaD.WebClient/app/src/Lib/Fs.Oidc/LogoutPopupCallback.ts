import oidcConfig from 'Config/open-id-connect-configuration';
import { UserManager } from 'oidc-client-ts';

new Promise(async () => {

  await oidcConfig.InitConfig();
  var defaultURLPath = window.location.origin;

  new UserManager(oidcConfig.Config).signoutPopupCallback("*", false).then(function () {
    console.log("signout callback success");
  }).catch(function (e) {
    console.log("signout callback failed");
    console.log(e);
  });
})
