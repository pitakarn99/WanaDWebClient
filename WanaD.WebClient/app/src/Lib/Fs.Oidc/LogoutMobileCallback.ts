import oidcConfig from 'Config/open-id-connect-configuration';
import { UserManager } from 'oidc-client-ts';

new Promise(async () => {

  await oidcConfig.InitConfig();
    window.location.href = oidcConfig.Config['default_callback_page'];
});
