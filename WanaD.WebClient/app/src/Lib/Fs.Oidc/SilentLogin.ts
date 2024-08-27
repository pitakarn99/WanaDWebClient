import oidcConfig from 'Config/open-id-connect-configuration';
import { UserManager } from 'oidc-client-ts';

new Promise(async () => {

  await oidcConfig.InitConfig();
  new UserManager(oidcConfig.Config).signinSilentCallback().then(function () {
    console.log("Silent Login Success");
  }).catch(function (e) {
    console.error(e);
  });
});
