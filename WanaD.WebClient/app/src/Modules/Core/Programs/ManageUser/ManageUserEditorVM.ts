/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-var */
import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import ManageUserSearchVM from "./ManageUserSearchVM";
import UserData01 from "../../../Core/Scripts/AppServiceContract/UserData01";
import ManageUserAppService from "../../Scripts/AppServiceContract/ManageUserAppService";
import { IRouter } from "@aurelia/router";

export default class ManageUserEditorVM extends EditorVMBase {
    Id: string;
    Name: string;
    IsActive: boolean;
    IsLocked: boolean;
    router: IRouter;
    Email: string;

    constructor() {
        super();
        this.ValidationRules.on(this);
    }

    async LoadOriginalSourceAsync(originalSource: UserData01) {
        this.Id = originalSource.UserUID;
        this.Name = originalSource.Name;
        this.Email = originalSource.Email;
        this.IsActive = originalSource.IsActive;
        this.IsLocked = originalSource.IsLocked;
    }
    async SaveOriginalSourceAsync(originalSource: UserData01) {
        originalSource.UserUID = $.trim(this.Id);
        originalSource.Name = $.trim(this.Name);
        originalSource.Email = $.trim(this.Email);
        originalSource.IsActive = this.IsActive;
        originalSource.IsLocked = this.IsLocked;
    }
    async RemoveAsync(searchVM: ManageUserSearchVM, removeCallback: () => Promise<void>) {
        var self = this;
        FsUtility.AlertModal("Are you sure you want to delete?", 3, 3, async (result) => {
            if (result) {
                var service = self.container.get(ManageUserAppService) as ManageUserAppService;
                try {
                    await service.RemoveAsync(self.Id);
                    FsUtility.AlertModal("The item has been updated successfully", 2, 1);
                    if (removeCallback != null)
                        await removeCallback();
                } catch (error) {
                    FsUtility.CommonErrorHandler(error);
                }
            }

        })
    }
    EditUserUrl(editorVM: ManageUserEditorVM) {
        var self = this;
        this.router.load("Modules/Core/UserDetailPage/" + editorVM.Id);
    }
}
