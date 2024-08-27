/* eslint-disable @typescript-eslint/no-this-alias */

import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
//import ManageUserGroupSearchVM from "./ManageUserGroupSearchVM";
import UserData01 from "../../../Core/Scripts/AppServiceContract/UserData01";
//import ManageUserGroupAppService from "../../Scripts/AppServiceContract/ManageUserGroupAppService";
import { IRouter } from "@aurelia/router";
import ManageUserGroupSearchVM from "./ManageUserGroupSearchVM";
import ManageUserGroupAppService from "../../../Core/Scripts/AppServiceContract/ManageUserGroupAppService";

export default class ManageUserGroupEditorVM  extends EditorVMBase {
 Id: string;
    Name: string;
    IsActive: boolean;
    router: IRouter;

    constructor() {
        super();
        this.ValidationRules.on(this);
    }

    async LoadOriginalSourceAsync(originalSource: UserData01) {
        this.Id = originalSource.UserUID;
        this.Name = originalSource.Name;
        this.IsActive = originalSource.IsActive;
    }
    async SaveOriginalSourceAsync(originalSource: UserData01) {
        originalSource.UserUID = $.trim(this.Id);
        originalSource.Name = $.trim(this.Name);
        originalSource.IsActive = this.IsActive;

    }
    async RemoveAsync(searchVM: ManageUserGroupSearchVM, removeCallback: () => void) {
        const self = this;
        FsUtility.AlertModal("Are you sure you want to delete?", 3, 3, async (result) => {
            if (result) {
                const service = this.container.get(ManageUserGroupAppService) as ManageUserGroupAppService;
              try {
                await service.RemoveAsync(self.Id);
                FsUtility.AlertModal("The item has been updated successfully", 2, 1);
                if (removeCallback != null)
                  removeCallback();
              } catch (error) {
                FsUtility.CommonErrorHandler(error);
              }
            }

        })
    }
    EditUserUrl(editorVM: ManageUserGroupEditorVM) {
      const self = this;
        this.router.load("Modules/WanaD/UserGroupDetailPage/" + editorVM.Id);
    }
}
