import EditableContainerBase from "./EditableContainerBase";

export default class TreeSearchVMBase extends EditableContainerBase {
  RootNodes: any[] = [];
  currentItem: any = null;
  get CurrentItem(): any {
    return this.currentItem;
  }

  PrepareRootNodes() {

  }

  async SetCurrentItemAsync(value: any) {
    if (!this.HasEditingChilds) {
      this.currentItem = value;
      await this.OnCurrentChangedAsync();
    }
  }
  async OnCurrentChangedAsync() {
    this.ClearChildNode();
    if (this.CurrentItem == null) return;

    this.AddChildNode(this.CurrentItem);

    var editableContainer = this.CurrentItem as EditableContainerBase;
    if (editableContainer != null)
      await editableContainer.ActivateAsync();
  }
}
