/* eslint-disable @typescript-eslint/no-inferrable-types */
import DocEditorVMBase from "Lib/Fs.SmartClient.Client/DocEditorVMBase";
import { DialogController } from '@aurelia/dialog';

export default class ImportModalVM {
    controller: DialogController;
    okbtn: string = "OK";
    okbtnclass: string = "btn btn-default";
    cancelbtn: string = "Cancel";
    cancelbtnclass: string = "btn btn-default";
    IsShowCancel: boolean;
    viewModel: DocEditorVMBase;
    view: string;
    Header: string;
  constructor(controller: DialogController) {
        this.controller = controller;
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

  async OkayAsync() {
    await this.viewModel.EndEditAsync();
        if (this.viewModel.ValidationController != null) {
            this.viewModel.ValidationController.validate({ object: this.viewModel }).then(async result => {
                
                //var yyy = this.viewModel.validationController.length
                if (result.valid) {
                  await this.viewModel.EndEditAsync();
                    this.viewModel.IsItemEditing = false;
                    this.controller.ok(this.viewModel);
                }
            });

        } else {
            this.controller.ok(this.viewModel);


        }
        //    this.controller.ok(this.viewModel);
    }


}
