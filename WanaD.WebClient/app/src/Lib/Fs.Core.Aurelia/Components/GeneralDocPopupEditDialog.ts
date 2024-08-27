import { IDialogController } from "@aurelia/dialog";
import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";

import DocEditorVMBase from "Lib/Fs.SmartClient.Client/DocEditorVMBase";
import { resolve } from "aurelia";

export default class GeneralDocPopupDialog {
    viewModel: DocEditorVMBase;
    view: string;
    controller: IDialogController = resolve(IDialogController);
    constructor() { }
    activate(data: any) {
        this.viewModel = data.viewModel;
        this.view = data.view;
    }

    async UpdateAsync() {
        const result = await this.viewModel.ValidationController.validate({
            object: this.viewModel,
        })
        if (result.valid) {
            await this.viewModel.EndEditAsync();
            this.viewModel.IsItemEditing = false;
            this.controller.ok(this.viewModel);
        }
    }

    async CancelAsync() {
        await this.viewModel.CancelEditAsync();
        this.viewModel.IsItemEditing = false;
        this.controller.cancel(this.viewModel);
    }

    Edit() {
        this.viewModel.IsEditing = true;
        this.viewModel.IsItemEditing = true;
    }
}
