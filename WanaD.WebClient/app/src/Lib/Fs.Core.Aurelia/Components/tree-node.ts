/* eslint-disable @typescript-eslint/no-explicit-any */
import { bindable, BindingMode } from "aurelia";
import TreeNodeEditorVMBase from "Lib/Fs.SmartClient.Client/TreeNodeEditorVMBase";
import TreeSearchVMBase from "Lib/Fs.SmartClient.Client/TreeSearchVMBase";

export class TreeNode {
  @bindable({ mode: BindingMode.twoWay }) selectedItem: any = null;
  @bindable() current: TreeNodeEditorVMBase = null;
  @bindable() dataContext: TreeSearchVMBase;

  async SelectItemAsync(value: TreeNodeEditorVMBase) {
    this.dataContext.SetCurrentItemAsync(value);
  }
}
