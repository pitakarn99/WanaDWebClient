import Aurelia, { StyleConfiguration } from "aurelia";
import { App } from "./app";
import { I18nConfiguration } from '@aurelia/i18n';
import Fetch from "i18next-fetch-backend";
import { RouterConfiguration } from "@aurelia/router";
import { ValidationHtmlConfiguration } from "@aurelia/validation-html";
import { DialogDefaultConfiguration } from "@aurelia/dialog";
import { fs } from "./Config/FsConfig";
import { FsPaging } from "./Lib/Fs.Core.Aurelia/Components/fs-paging";

import bootstrap from "bootstrap/dist/css/bootstrap.css";
import OidcConfig from "./Config/open-id-connect-configuration";

import * as DateFormat from "Lib/Fs.Core.Aurelia/DateFormat";
import * as Select2 from "Lib/Fs.Core.Aurelia/Components/select2";
import * as NumberFormat from "Lib/Fs.Core.Aurelia/NumberFormat";
import * as fsdatetimepicker from "Lib/Fs.Core.Aurelia/Components/fs-datetime-picker";
import { WanaD } from "./Modules/WanaD";
import { Core } from "./Modules/Core";
import { CoreIDS } from "./Modules/CoreIDS";
import 'bootstrap';
import { FsGridHeaderCustomElement } from "Lib/Fs.Core.Aurelia/Components/fs-grid-header";
import "bootstrap-icons/font/bootstrap-icons.css";
Aurelia.register(
    StyleConfiguration.shadowDOM({
        sharedStyles: [bootstrap], 
    }),
    fs,
    OidcConfig,
    fs.InitConfig(),
    OidcConfig.InitConfig(),
    DialogDefaultConfiguration.customize((settings) => {
        settings.lock = true;
        settings.startingZIndex = 5;
    }),
    ValidationHtmlConfiguration,
    I18nConfiguration.customize((options) => {
        options.translationAttributeAliases = ["t", "i18n"];
        options.initOptions = {
            plugins: [Fetch],
            backend: {
                loadPath: loadPath,
            },
            fallbackLng: "en",
        };
    }),
    RouterConfiguration.customize({
        useUrlFragmentHash: true,
        title: "${componentTitles}${appTitleSeparator}My App",
    }),
    DateFormat,
    NumberFormat,
    fsdatetimepicker,
    FsGridHeaderCustomElement,
    FsPaging,
    Select2,
    WanaD,//<= register modules
    Core,//<= register modules
    CoreIDS//<= register modules
)
    .app(App)
    .start();

function loadPath(lng, namespace) {
    if (namespace == "translation") return;

    const splitPath = namespace.split(".");
    let path = "";
    if (splitPath.length > 1) {
        path =
            "./webpack/src/Modules/" +
            splitPath[0] +
            "/Locales/" +
            lng +
            "/" +
            splitPath[1] +
            ".json";
    } else {
        path =
            "./webpack/src/Modules/Core/Locales/" +
            lng +
            "/" +
            splitPath[0] +
            ".json";
    }
    return path;
}
