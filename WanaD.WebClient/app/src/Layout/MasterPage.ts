/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
import { User } from "oidc-client";
import { IRouter, IRoute, IRouteableComponent, Parameters } from "@aurelia/router";
import MenuData from "../Modules/Core/Scripts/AppServiceContract/MenuData";
import UserProfile from "../Modules/Core/Scripts/UserProfile";
import { IContainer, resolve } from "aurelia";
import { I18N } from '@aurelia/i18n';
import { UserManager } from "oidc-client-ts";
import { WanaD } from "../Modules/WanaD";
import { Core } from "../Modules/Core";
import MenuAppService from "../Modules/Core/Scripts/AppServiceContract/MenuAppService";
import MenuParameter from "../Modules/Core/Scripts/AppServiceContract/MenuParameter";
import FsUtility from "../Lib/Fs.SmartClient.Client/FsUtility";
import { debug } from "console";


export class MasterPage implements IRouteableComponent {
    public User: User;
    container: IContainer = resolve(IContainer);
    public parentMenu: any[] = [];
    public menuItems: any[] = [];
    public Links: any[] = [];

    public UserProfile: UserProfile;
    public Code: string;
    public Root: string;
    public MainParent: MenuData;
    public ParentLast: MenuData;
    public ParentCode: string;
    LocaleString: string;
    i18n: any;
    
    router: IRouter = resolve(IRouter);
    constructor() {
       
        this.i18n = this.container.get(I18N);
       

        this.Init();
    }
    
   

    async changeLocale(locale: string) {
        this.LocaleString = locale;

        this.i18n.setLocale(locale);
        this.i18n.i18next.changeLanguage(locale);
        sessionStorage.setItem("CurrentSystemLocale", locale);
    }

    async logout() {
        localStorage.setItem("callbackLink", window.location.href);
        const userManager = this.container.get(UserManager);
        await userManager.signoutRedirect();
    }
    async Init() {

        const wanaD = this.container.get(WanaD);
        wanaD.Init();

        const demoAureliaRoutes = wanaD.GetRoute("MasterPage");
        demoAureliaRoutes.forEach(newRoute => {
            MasterPage.routes.push(newRoute);
        });

        const core = this.container.get(Core);
        const coreRoutes = core.GetRoute("MasterPage");
        coreRoutes.forEach(newRoute => {
            MasterPage.routes.push(newRoute);
        });

    }
    public async GenerateMenu() {
        const self = this;
        const service = this.container.get(MenuAppService) as MenuAppService;

        try {
            const result = await service.GenerateMenuAsync(this.GetMenuCriteria());

            self.Links = result;

            const menuData = self.FindMenuData(self.Links, self.Code);

            if (menuData != null) {
                this.MainParent = this.FindMainParentCode(menuData);
            }
        } catch (error) {
            FsUtility.CommonErrorHandler(error);
        }
    }
    FindMenuData(links: MenuData[], code: string): MenuData {
        if (links.length == 0)
            return null;

        const menuData = links.find(t => t.Code == code);

        if (menuData != null) {
            return menuData;
        } else {
            let result = null;
            for (let i = 0; i < links.length; i++) {
                result = this.FindMenuData(links[i].ChildrenMenu, code);
                if (result != null) {
                    break;
                }
            }
            return result;
        }
    }

    FindMainParentCode(menuData: MenuData): MenuData {
        if (menuData == null)
            return null;

        if (menuData.ParentCode == this.Root || menuData.ParentCode == null)
            return menuData;

        this.ParentLast = menuData;
        const parentMenu = this.FindMenuData(this.Links, menuData.ParentCode);

        return this.FindMainParentCode(parentMenu);
    }

    private GetMenuCriteria(): MenuParameter {
        const criteria = new MenuParameter();
        criteria.IsShowAll = false;
        criteria.Root = this.Root;
        return criteria;
    }

    public static routes: IRoute[] = [{
        path: ["*"],
        component: () => import("Lib/Fs.Core.Aurelia/Components/not-found"),
        id: "not-found",
        title: "Not Found",
        viewport: 'main'
    },];


    async loading(params, instruction, navigation) {
        let currentLocale = sessionStorage.getItem("CurrentSystemLocale");
        if (currentLocale == null || currentLocale == "null") {
            currentLocale = "en";
        }
        this.LocaleString = this.i18n.getLocale();
        this.changeLocale(currentLocale);
        const thisRoute = await MasterPage.routes.find(t => t.data == null ? false : instruction.route.remaining.indexOf(t.data["PathRoute"]) >= 0) as any
        if (thisRoute) {
            if (thisRoute.data) {
                this.Code = thisRoute.data.CodeMenu;
                this.Root = thisRoute.data.RootMenu;
                this.GenerateMenu();
            }
        } else {
            this.Code = "";
            this.Root = "admin";
            this.GenerateMenu();
        }
    }
    LoadPage(menuData: MenuData) {

        this.Code = menuData.Code;
        this.MainParent = this.FindMainParentCode(menuData);
    }

}

