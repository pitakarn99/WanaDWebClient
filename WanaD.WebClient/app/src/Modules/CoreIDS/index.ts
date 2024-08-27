/* eslint-disable no-var */
import { IRouteableComponent, IRoute, IRouter } from "@aurelia/router";
import { IContainer, resolve } from "aurelia";
import { I18N } from "@aurelia/i18n";

export class CoreIDS implements IRouteableComponent {
    //container: IContainer = resolve(IContainer);

    static routes: IRoute[] = [
        {
            path: "ForgetPasswordPage",
            component: () => import("Modules/Core/Programs/ForgetPassword/ForgetPasswordVM"),
            id: "ForgetPassword",
            title: "Forget Password",
        },
        {
            path: "CreatePasswordPage/:TokenNo/:ResourceId",
            component: () => import("Modules/Core/Programs/CreatePassword/CreatePasswordVM"),
            id: "CreatePassword",
            title: "Create Password",
        },
        {
            path: "CreatePasswordPage/RedirectSuccess",
            component: () => import("Modules/Core/Programs/CreatePassword/RedirectSuccessVM"),
            id: "CreatePasswordRedirectSuccess",
            title: "Redirect Success",
        },
        {
            path: "ChangePasswordPage/:TokenNo?/:ResourceId?",
            component: () => import("Modules/Core/Programs/ChangePassword/ChangePasswordVM"),
            id: "ChangePassword",
            title: "Change Password",
        },
        {
            path: "ChangePasswordPage/RedirectSuccess",
            component: () => import("Modules/Core/Programs/ChangePassword/RedirectSuccessVM"),
            id: "ChangePasswordRedirectSuccess",
            title: "Redirect Success",
        },
        {
            path: "Activate/:TokenNo/:ResourceId",
            component: () => import("Modules/Core/Programs/Activate/ActivateVM"),
            id: "Activate",
            title: "Activate",
        }
    ];
    constructor() {
    }
}
