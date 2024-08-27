/* eslint-disable no-var */
import { IRouteableComponent, IRoute, IRouter } from "@aurelia/router";
import { IContainer, resolve } from "aurelia";
import { I18N } from "@aurelia/i18n";

export class Core  {
    container: IContainer = resolve(IContainer);
    GetRoute(Layout: string): IRoute[] {
        return this.routes;
    }
    routes: IRoute[] = [
        {
            path: "Core/Welcome",
            component: () => import("Modules/Core/Programs/Welcome/Welcome"),
            id: "Welcome",
            title: "Welcome", viewport: 'main'
        },
        {
            path: "Core/Test",
            component: () => import("Modules/Core/Programs/Test/Test"),
            id: "Test",
            title: "Test", viewport: 'main'
        },
        {
            path: "Core/ManageConfigurationPage",
            component: () => import("Modules/Core/Programs/ManageConfiguration/ConfigurationSearchVM"),
            id: "ManageConfiguration",
            title: "Manage Configuration", viewport: 'main'
        },
        {
            path: "Core/ManageUserPage",
            component: () => import("Modules/Core/Programs/ManageUser/ManageUserSearchVM"),
            id: "ManageUser",
            title: "Manage User", viewport: 'main',
            data: { RootMenu: "admin", CodeMenu: "ManageInernalUser", PathRoute: "Core/ManageUserPage" },
        },
        {
            path: "Core/UserDetailPage/:id?",
            component: () =>
                import("Modules/Core/Programs/UserDetail/UserDetailEditorVM"),
            id: "UserDetail",
            title: "User Detail", viewport: 'main',
            data: { RootMenu: "admin", CodeMenu: "ManageInernalUser", PathRoute: "Core/UserDetailPage" },
        },
        {
            path: "Core/ManageUserGroupPage",
            component: () => import("Modules/Core/Programs/ManageUserGroup/ManageUserGroupSearchVM"),
            id: "ManageUserGroup",
            title: "Manage User Group", viewport: 'main'

        },        
        {
            path: "Core/UserGroupDetailPage/:id?",
            component: () =>
                import("Modules/Core/Programs/UserGroupDetail/UserGroupDetailEditorVM"),
            id: "UserDetail",
            title: "User Detail", viewport: 'main'
        },
        {
            path: "Core/AuditLogPage",
            component: () => import("Modules/Core/Programs/AuditLog/AuditLogSearchVM"),
            id: "AuditLog",
            title: "Audit Log", viewport: 'main'
        }
    ];
   /* constructor() {
  
    }*/
    async Init() {
        var i18n = this.container.get(I18N);
        i18n.i18next
            .loadNamespaces(["Core.common", "Core.Test"])
            .then(() => {
                console.log("Load namespace succeed.");
            })
            .catch((reason) => {
                console.log("Load namespace failed. reason: " + reason);
            });
    }
    async changeLocale(locale: string) {
        var i18n = this.container.get(I18N);
        i18n.setLocale(locale);
        i18n.i18next.changeLanguage(locale);
        sessionStorage.setItem("CurrentSystemLocale", locale);
    }
}
