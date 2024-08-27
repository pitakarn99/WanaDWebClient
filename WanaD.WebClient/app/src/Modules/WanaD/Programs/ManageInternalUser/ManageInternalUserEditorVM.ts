import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import UserData01 from "../../../Core/Scripts/AppServiceContract/UserData01";
import ManageUserAppService from "../../Scripts/AppServiceContract/ManageUserAppService";
import { IRouter } from "@aurelia/router";
import ManageInternalUserSearchVM from "./ManageInternalUserSearchVM";

export default class ManageInternalUserEditorVM extends EditorVMBase {
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
        originalSource.UserUID = this.Id == null ? null : this.Id.trim();
        originalSource.Name =  this.Name == null ? null : this.Name.trim();
        originalSource.Email =  this.Email == null ? null : this.Email.trim();
        originalSource.IsActive = this.IsActive;
        originalSource.IsLocked = this.IsLocked;
    }
    async RemoveAsync(searchVM: ManageInternalUserSearchVM, removeCallback: () => Promise<void>) {
        const self = this;
        FsUtility.AlertModal("Are you sure you want to delete?", 3, 3, async (result) => {
            if (result) {
                const service = self.container.get(ManageUserAppService) as ManageUserAppService;
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
    EditUserUrl(editorVM: ManageInternalUserEditorVM) {
        const self = this;
        self.router.load("Modules/WanaD/InternalUserDetailPage/" + editorVM.Id);
    }
}
