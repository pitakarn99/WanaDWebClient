import { IRouteableComponent, IRoute, IRouter } from "@aurelia/router";
import { IContainer, resolve } from "aurelia";
import { I18N } from "@aurelia/i18n";


export class WanaD {

    container: IContainer = resolve(IContainer);
    thislayout: string;

    GetRoute(Layout: string): IRoute[] {
        return this.routes;
    }


    readonly router: IRouter = resolve(IRouter);
    routes: IRoute[] = [

        {
            path: "WanaD/FarmRegisterPage",
            component: () =>
                import("Modules/WanaD/Programs/Farm/FarmSearchVM"),
            id: "FarmRegister",
            title: "Farm",
            data: { RootMenu: "admin", CodeMenu: "FarmRegister", PathRoute: "WanaD/FarmRegisterPage" },
            viewport: 'main'
        },

        {
            path: "WanaD/ManageUserPage",
            component: () =>
                import("Modules/WanaD/Programs/ManageUser/ManageUserSearchVM"),
            id: "ManageUser",
            title: "Manage User",
            data: { RootMenu: "admin", CodeMenu: "ManageUser", PathRoute: "WanaD/ManageUserPage" },
            viewport: 'main'
        },

        {
            path: "WanaD/ManageUserGroupPage",
            component: () =>
                import("Modules/WanaD/Programs/ManageUserGroup/ManageUserGroupSearchVM"),
            id: "ManageUserGroup",
            title: "Manage User Group",
            data: { RootMenu: "admin", CodeMenu: "ManageUserGroup", PathRoute: "WanaD/ManageUserGroupPage" },
            viewport: 'main'
        },
        {
            path: "WanaD/VisitPlotCollectionPage",
            component: () =>
                import("Modules/WanaD/Programs/VisitPlotCollection/VisitPlotCollectionSearchVM"),
            id: "VisitPlotCollection",
            title: "Visit Plot Collection",
            data: { RootMenu: "admin", CodeMenu: "VisitPlotCollection", PathRoute: "WanaD/VisitPlotCollectionPage" },
            viewport: 'main'
        }, {
            path: "WanaD/BioAcousticPage",
            component: () =>
                import("Modules/WanaD/Programs/BioAcoustic/BioAcousticSearchVM"),
            id: "BioAcoustic",
            title: "Bio Acoustic",
            data: { RootMenu: "admin", CodeMenu: "BioAcoustic", PathRoute: "WanaD/BioAcousticPage" },
            viewport: 'main'
        },
        {
            path: "WanaD/PlotScorePage",
            component: () =>
                import("Modules/WanaD/Programs/PlotScore/PlotScoreSearchVM"),
            id: "PlotScore",
            title: "Visit Plot Collection",
            data: { RootMenu: "admin", CodeMenu: "PlotScore", PathRoute: "WanaD/PlotScorePage" },
            viewport: 'main'
        },
        {
            path: "WanaD/UserGroupDetailPage/:id?",
            component: () =>
                import("Modules/WanaD/Programs/UserGroupDetail/UserGroupDetailEditorVM"),
            id: "UserDetail",

            title: "User Detail",
            data: { RootMenu: "admin", CodeMenu: "ManageUserGroup", PathRoute: "WanaD/UserGroupDetailPage" },
            viewport: 'main'
        },
        {
            path: "WanaD/UserDetailPage/:id?",
            component: () =>
                import("Modules/WanaD/Programs/UserDetail/UserDetailEditorVM"),
            id: "UserDetail",
            title: "User Detail",
            data: { RootMenu: "admin", CodeMenu: "ManageUser", PathRoute: "WanaD/UserDetailPage" },
            viewport: 'main'
        },

        {
            path: "WanaD/ManageGenerateCodePage",
            component: () =>
                import("Modules/WanaD/Programs/GenerateCode/GenerateCodeSearchVM"),
            id: "GenerateCode",
            title: "Generate Code",
            data: { RootMenu: "admin", CodeMenu: "GenerateCode", PathRoute: "WanaD/ManageGenerateCodePage" },
            viewport: 'main'
        },
        {
            path: "WanaD/ManageGenerateCodeDetailPage/:id?",
            component: () =>
                import("Modules/WanaD/Programs/GenerateCode/GenerateCodeDetailSearchVM"),
            id: "GenerateCodeDetail",
            title: "Generate Code Detail",
            data: { RootMenu: "admin", CodeMenu: "GenerateCode", PathRoute: "WanaD/ManageGenerateCodeDetailPage" },
            viewport: 'main'
        },

        {
            path: "WanaD/FarmDetailPage/:id?",
            component: () =>
                import("Modules/WanaD/Programs/Farm/FarmDetailEditorVM"),
            id: "Farm",
            title: "Farm Detail",
            data: { RootMenu: "admin", CodeMenu: "FarmRegister", PathRoute: "WanaD/FarmPage" },
            viewport: 'main'
        },

        {
            path: "WanaD/FarmAddPage",
            component: () =>
                import("Modules/WanaD/Programs/Farm/FarmDetailEditorVM"),
            id: "Farm",
            title: "Add Farm",
            data: { RootMenu: "admin", CodeMenu: "FarmRegister", PathRoute: "WanaD/FarmAddPage" },
            viewport: 'main'
        },

        {
            path: "WanaD/ManageFactoryPage",
            component: () =>
                import("Modules/WanaD/Programs/Factory/FactorySearchVM"),
            id: "ManageFactory",
            title: "Factory",
            data: { RootMenu: "admin", CodeMenu: "ManageFactory", PathRoute: "WanaD/ManageFactoryPage" },
            viewport: 'main'
        },

        {
            path: "WanaD/FactoryAddPage",
            component: () =>
                import("Modules/WanaD/Programs/Factory/FactoryDetailEditorVM"),
            id: "ManageFactory",
            title: "Add Factory",
            data: { RootMenu: "admin", CodeMenu: "ManageFactory", PathRoute: "WanaD/FactoryAddPage" },
            viewport: 'main'
        },
        
        {
            path: "WanaD/FactoryDetailPage/:id?",
            component: () =>
                import("Modules/WanaD/Programs/Factory/FactoryDetailEditorVM"),
            id: "ManageFactory",
            title: "Factory Detail",
            data: { RootMenu: "admin", CodeMenu: "ManageFactory", PathRoute: "WanaD/FactoryDetailPage" },
            viewport: 'main'
        },

        {
            path: "WanaD/ManageOrderPage",
            component: () =>
                import("Modules/WanaD/Programs/Order/OrderSearchVM"),
            id: "Order",
            title: "Manage Order",
            data: { RootMenu: "admin", CodeMenu: "Order", PathRoute: "WanaD/ManageOrderPage" },
            viewport: 'main'
        },

        {
            path: "WanaD/AddOrderPage",
            component: () =>
                import("Modules/WanaD/Programs/Order/OrderDetailEditorVM"),
            id: "AddOrder",
            title: "Add Order",
            data: { RootMenu: "admin", CodeMenu: "Order", PathRoute: "WanaD/AddOrderPage" },
            viewport: 'main'
        },

        {
            path: "WanaD/OrderDetailPage/:id?",
            component: () =>
                import("Modules/WanaD/Programs/Order/OrderDetailEditorVM"),
            id: "ManageOrder",
            title: "Order Detail",
            data: { RootMenu: "admin", CodeMenu: "Order", PathRoute: "WanaD/OrderDetailPage" },
            viewport: 'main'
        },

        {
            path: "WanaD/ManageContractPage",
            component: () =>
                import("Modules/WanaD/Programs/ManageBiodiversityContract/ManageBiodiversityContractSearchVM"),
            id: "ManageContract",
            title: "Manage Contract",
            data: { RootMenu: "admin", CodeMenu: "ManageContract", PathRoute: "WanaD/ManageContractPage" },
            viewport: 'main'
        }, {
            path: "WanaD/ManageBiodiversityChartPage",
            component: () =>
                import("Modules/WanaD/Programs/ManageBiodiversityChart/ManageBiodiversityChartSearchVM"),
            id: "ManageBiodiversityChart",
            title: "Manage Biodiversity Chart",
            data: { RootMenu: "admin", CodeMenu: "ManageBiodiversityChart", PathRoute: "WanaD/ManageBiodiversityChartPage" },
            viewport: 'main'
        },

        {
            path: "WanaD/ManageEvaluateContractPage",
            component: () =>
                import("Modules/WanaD/Programs/ManageEvaluateBiodiversityContract/ManageEvaluateBiodiversityContractSearchVM"),
            id: "EvaluateContract",
            title: "Manage Contract",
            data: { RootMenu: "admin", CodeMenu: "ManageEvaluateContract", PathRoute: "WanaD/ManageEvaluateContractPage" },
            viewport: 'main'
        },

        {
            path: "WanaD/ManageInternalUserPage",
            component: () => import("Modules/WanaD/Programs/ManageInternalUser/ManageInternalUserSearchVM"),
            id: "ManageInternalUser",
            title: "Manage Internal User",
            viewport: 'main',
            data: { RootMenu: "admin", CodeMenu: "ManageInternalUser", PathRoute: "WanaD/ManageInternalUserPage" },
        },

        {
            path: "WanaD/InternalUserDetailPage/:id?",
            component: () => import("Modules/WanaD/Programs/InternalUserDetail/InternalUserDetailEditorVM"),
            id: "InternalUserDetail",
            title: "Internal User Detail",
            viewport: 'main',
            data: { RootMenu: "admin", CodeMenu: "ManageInternalUser", PathRoute: "WanaD/InternalUserDetailPage" },
        },

    ];




    async Init() {
        const i18n = this.container.get(I18N);
        i18n.i18next
            .loadNamespaces([
                "WanaD.common", //WanaD name Modules                
                "WanaD.Order",
                "WanaD.OrderDetail",
                "WanaD.ProductListing",
                "WanaD.ProductionDetail"
            ])
            .then(() => {
                // console.log("Load namespace succeed.");
            })
            .catch((reason) => {
                //console.log("Load namespace failed. reason: " + reason);
            });

    }

}
