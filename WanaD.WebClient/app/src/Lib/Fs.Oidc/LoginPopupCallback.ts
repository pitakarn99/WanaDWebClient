import oidcConfig from 'Config/open-id-connect-configuration';
import { UserManager } from 'oidc-client-ts';

new Promise(async () => {

  await oidcConfig.InitConfig();
  var defaultURLPath = window.location.origin;

    new UserManager(oidcConfig.Config).signinPopupCallback().then(function (user) {
  }).catch(function (e) {
    console.error(e);
    var errorCallbackLink = oidcConfig.Config['default_callback_page'];
    if (errorCallbackLink != null) {
      if (oidcConfig.Config['default_callback_page'].includes(defaultURLPath)) {
        window.location.href = errorCallbackLink;
      } else {
        window.location.href = "/";
      }
    } else {
      window.location.href = "/";
    }
  });
})
