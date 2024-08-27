import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";

export default class RootDocEditorVMBase extends EditorVMBase {
  SavedDocument: any;

  constructor() {
    super();
  }

  async OpenAsync(id: string) {
    if (id != null) {
      await this.LoadAsync(id);
      await this.ActivateAsync();
    } else await this.ActivateAsync();
  }

  BeginEdit() {
    this.SetIsEditing(true);
    var childNodes = this.GetChildNode();
    for (var index = 0; index < childNodes.length; index++) {
      var editor = childNodes[index];
      if (editor.BeginEdit != null) editor.BeginEdit();
    }
  }

  async CancelEditAsync() {
    if (!this.IsEditing) return;

    this.SetIsEditing(false);
    if (this.HasOriginalSource)
      await this.LoadOriginalSourceAsync(this.OriginalSource);

    var childNodes = this.GetChildNode();
    for (var index = 0; index < childNodes.length; index++) {
      var editor = childNodes[index];
      if (editor.CancelEdit != null) editor.CancelEdit();
    }
    //this.FullLoad();
  }

  async EndEditAsync() {
    if (!this.IsEditing) return;

    this.SetIsEditing(false);
    this.OriginalSource = this.SavedDocument;

    var childNodes = this.GetChildNode();
    for (var index = 0; index < childNodes.length; index++) {
      var editor = childNodes[index];
      if (editor.EndEditAsync != null) await editor.EndEditAsync();
    }

    //this.FullLoad();
  }
}
