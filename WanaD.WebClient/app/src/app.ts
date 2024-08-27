import { IRouteableComponent, IRoute, IRouter } from "@aurelia/router";
import { fs } from "./Config/FsConfig";
import { IHydratedController } from "@aurelia/runtime-html";
import OidcConfig from "./Config/open-id-connect-configuration";
import { UserManager } from "oidc-client-ts";
import { IContainer, Registration, resolve } from "aurelia";
import { FsApp } from "./Lib/Fs.Core.Aurelia/Components/fsapp";


export class App extends FsApp implements IRouteableComponent {
    //static title: string = "wwww";
    container: IContainer = resolve(IContainer);
    router: IRouter = resolve(IRouter);
    constructor() {
        super();

    }
    async attached() {
      
        super.attached()
        
        
    }
    async Init() {
        super.Init();

      
    }
    static routes: IRoute[] = [
       
       
        {
            path: "Modules",
            component: () => import("Layout/MasterPage"),
            id: "Modules",
            data: { Root: "admin", Code: "eiei" },
        },
       
        {
            path: ["*"],
            component: () => import("Lib/Fs.Core.Aurelia/Components/not-found"),
            id: "not-found",
            title: "Not Found",
        },
    ];
}
