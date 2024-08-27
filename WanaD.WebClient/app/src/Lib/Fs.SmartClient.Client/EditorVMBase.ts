import EditableContainerBase from "Lib/Fs.SmartClient.Client/EditableContainerBase";

import { IContainer } from "aurelia";
import SearchVMBase from "Lib/Fs.SmartClient.Client/SearchVMBase";
import CommonSearchVMBase from "./CommonSearchVMBase";

export default class EditorVMBase extends EditableContainerBase {
  index: number;
  HasOriginalSource: boolean = false;
  OriginalSource: any;

  async SetOriginalSourceAsync(originalSource) {
    if (originalSource == null) this.HasOriginalSource = false;
    else {
      this.OriginalSource = originalSource;
      this.HasOriginalSource = true;
      await this.LoadOriginalSourceAsync(originalSource);
    }
  }

  constructor() {
    super();
    var self = this;
  }

  async SaveAsync(
    doneCallback: () => void,
    failCallback: (error: any) => void
  ) {}

  async RemoveAsync(
    searchVM: CommonSearchVMBase,
    doneCallback: () => Promise<void>
  ) {}

  BeginEdit() {
    this.SetIsEditing(true);
  }

  async CancelEditAsync() {
    if (!this.IsEditing) return;

    this.SetIsEditing(false);
    if (this.HasOriginalSource)
      await this.LoadOriginalSourceAsync(this.OriginalSource);
  }

  async EndEditAsync() {
    if (!this.IsEditing) return;

    this.SetIsEditing(false);
    var temp = new Object();
    await this.SaveOriginalSourceAsync(temp);
    await this.SetOriginalSourceAsync(temp);
    await this.FullLoadAsync();
  }

  async LoadOriginalSourceAsync(originalSource: any) {}

  async SaveOriginalSourceAsync(originalSource: any) {}

  async FullLoadAsync() {
    if (this.HasOriginalSource) await super.FullLoadAsync();
  }

  async LoadAsync(id: string) {}




 
}
