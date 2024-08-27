/* eslint-disable @typescript-eslint/no-this-alias */
import { IDialogController } from "@aurelia/dialog";
import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import { resolve } from "aurelia";

export default class GeneralPopupEditDialog {
    FsUtility: FsUtility;

    BtnSaveClass = "btn btn-default";
    BtnCancelClass = "btn btn-default";
    BtnCloseClass = "btn btn-default";
    BtnEditorClass = "btn btn-default";
    viewModel: EditorVMBase;
    view: string;
    Header: string;
    dialogController: IDialogController = resolve(IDialogController);
    constructor() { }
    async activate(data: any) {
        this.viewModel = data.viewModel;
        this.view = data.view;
        this.Header = data.Header;
        if (!(!data.BtnSaveClass || 0 === data.BtnSaveClass.length)) {
            this.BtnSaveClass = data.BtnSaveClass;
        }
        if (!(!data.BtnCancelClass || 0 === data.BtnCancelClass.length)) {
            this.BtnCancelClass = data.BtnCancelClass;
        }
        if (!(!data.BtnCloseClass || 0 === data.BtnCloseClass.length)) {
            this.BtnCloseClass = data.BtnCloseClass;
        }
        if (!(!data.BtnEditorClass || 0 === data.BtnEditorClass.length)) {
            this.BtnEditorClass = data.BtnEditorClass;
        }
    }

    async UpdateAsync() {
        const self = this;
        const result = await this.viewModel.ValidationController.validate({
            object: this.viewModel,
        });
        if (result.valid) {
            await self.viewModel.SaveAsync(async function () {
                await self.viewModel.EndEditAsync();
                self.dialogController.ok(self.viewModel);
            }, FsUtility.CommonErrorHandler);
        }
    }

    async CancelAsync() {
        this.dialogController.cancel(this.viewModel);
    }

    async EditAsync() {
        this.viewModel.BeginEdit();
    }

    async CancelEditAsync() {
        await this.viewModel.CancelEditAsync();
        if (!this.viewModel.HasOriginalSource) {
            await this.CancelAsync();
        }
    }
}
