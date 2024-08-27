import DocEditorVMBase from "Lib/Fs.SmartClient.Client/DocEditorVMBase";

import { IDialogController } from "@aurelia/dialog";
import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import { resolve } from "aurelia";

export default class GeneralDocPopupConfirmDialog {
  okbtn: string = "OK";
  okbtnclass: string = "btn btn-default";
  cancelbtn: string = "Cancel";
  cancelbtnclass: string = "btn btn-default";
  IsShowCancel: boolean;
  viewModel: DocEditorVMBase;
  view: string;
  Header: string;
  controller: IDialogController = resolve(IDialogController);
  constructor() {
    //this.IsShowCancel = true;
  }
  activate(data: any) {
    this.viewModel = data.viewModel;
    this.view = data.view;
    this.Header = data.Header;

    this.IsShowCancel = data.IsShowCancel;
    if (!(!data.okbtn || 0 === data.okbtn.length)) {
      this.okbtn = data.okbtn;
    }
    if (!(!data.okbtnclass || 0 === data.okbtnclass.length)) {
      this.okbtnclass = data.okbtnclass;
    }
    if (!(!data.cancelbtn || 0 === data.cancelbtn.length)) {
      this.cancelbtn = data.cancelbtn;
    }
    if (!(!data.cancelbtnclass || 0 === data.cancelbtnclass.length)) {
      this.cancelbtnclass = data.cancelbtnclass;
    }
  }

  Close() {
    //this.viewModel.CancelEdit();
    this.controller.cancel(this.viewModel);
  }

  Okay() {
    this.controller.ok(this.viewModel);
  }
}
