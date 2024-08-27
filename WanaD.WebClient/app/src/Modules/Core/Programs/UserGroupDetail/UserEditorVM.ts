/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-var */
import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import UserSearchVM from "./UserSearchVM";
import MemberData01 from "../../../Core/Scripts/AppServiceContract/MemberData01";
import MemberUpdateRequest from "../../../Core/Scripts/AppServiceContract/MemberUpdateRequest";
import { IRouter } from "@aurelia/router";

export default class UserEditorVM extends EditorVMBase {

    router: IRouter;

    Id: string;
    GroupUID: string;
    UserUID: string;
    UserName: string;

    constructor() {
        super();
        this.router = this.container.get(IRouter);
    }

  async LoadOriginalSourceAsync(originalSource: MemberData01) {
        this.Id = originalSource.UserUID
        this.GroupUID = originalSource.GroupUID
        this.UserUID = originalSource.UserUID
        this.UserName = originalSource.Name
    }

  async SaveOriginalSourceAsync(originalSource: MemberData01) {
        originalSource.UserUID = this.Id;
        originalSource.GroupUID = this.GroupUID;
        originalSource.UserUID = this.UserUID;
        originalSource.Name = this.UserName;
    }

  async RemoveAsync(searchVM: UserSearchVM, removeCallback: () => void) {
        var self = this;

        var req = new MemberUpdateRequest();

        req.GroupUID = self.GroupUID;
        req.UserUID = self.UserUID;

        //ManageUserGroupService.Service.RemoveMember(null, req)
        //    .done((result) => {
        //        FsUtility.AlertModal("The item has been updated successfully", 2, 1);
        //        if (removeCallback != null)
        //            removeCallback();
        //    }).fail((error) => {
        //        if (error.status != 401) {
        //            FsUtility.CommonErrorHandler(error);
        //        }
        //    });
    }
}
