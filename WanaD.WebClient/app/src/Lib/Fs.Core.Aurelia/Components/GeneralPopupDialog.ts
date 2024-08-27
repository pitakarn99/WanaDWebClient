import { IDialogController } from "@aurelia/dialog";
import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import { resolve } from "aurelia";
export default class GeneralPopupDialog {
    FsUtility: FsUtility;

    btnclass: string = "btn btn-default";
    viewModel: EditorVMBase;
    view: string;
    Header: string;
    dialogController: IDialogController = resolve(IDialogController);
    constructor() { }
    async activate(data: any) {
        this.viewModel = data.viewModel;
        this.view = data.view;
        this.Header = data.Header;
        if (!(!data.btnclass || 0 === data.btnclass.length)) {
            this.btnclass = data.btnclass;
        }
    }

    async OKAsync() {
        var self = this;
        const result = await this.viewModel.ValidationController.validate({
            object: this.viewModel,
        });
        if (result.valid) {
            self.dialogController.ok(self.viewModel);
        }
    }

    async CancelAsync() {
        this.dialogController.cancel(this.viewModel);
    }
}
