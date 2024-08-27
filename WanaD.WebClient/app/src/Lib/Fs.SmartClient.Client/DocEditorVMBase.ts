import TabViewModel from "Lib/Fs.SmartClient.Client/TabViewModel";

import { newInstanceForScope } from "@aurelia/kernel";
import { IObserverLocator, resolve } from "aurelia";
import { IValidationRules } from "@aurelia/validation";
import { IValidationController } from "@aurelia/validation-html";

export default class DocEditorVMBase extends TabViewModel {
  IsEditing: boolean = false;
  IsItemEditing: boolean = false;
  Parent: any;
  IsAdding: boolean;
  ErrorList: string[];
  OriginalSource: any;
  HasOriginalSource: boolean = false;
  ValidationController = resolve(
    newInstanceForScope(IValidationController)
  ) as IValidationController;
  ValidationRules = resolve(IValidationRules) as IValidationRules;

  async SetOriginalSourceAsync(originalSource: any, isAdding: boolean) {
    if (originalSource == null) this.HasOriginalSource = false;
    else {
      this.OriginalSource = originalSource;
      this.HasOriginalSource = true;
      await this.LoadOriginalSourceAsync(originalSource, isAdding);
    }
  }

  constructor() {
    super();
  }

  async getValidateErrors(key: string) {
    const result = await this.ValidationController.results.filter(
      (t) => t.valid
    ).length;
    if (result == 0) return [];
    const filter = this.ValidationController.results.filter(function (t) {
      return t.propertyName === key;
    });
    if (filter.length == 0) return [];
    const map = filter.map(function (t) {
      return t.message;
    });
    return map;
  }

  async getDisplayNameValidateErrors(key: string) {
    const result = await this.ValidationController.results.filter(
      (t) => t.valid
    ).length;
    if (result == 0) return [];
    const filter = this.ValidationController.results.filter(function (t) {
      return t.rule.messageKey === key;
    });
    if (filter.length == 0) return [];
    const map = filter.map(function (t) {
      return t.message;
    });
    return map;
  }

  IsSelectedItem: boolean;
  get IsShowInput() {
    return this.IsEditing && this.IsSelectedItem;
  }

  async SaveOriginalSourceAsync(originalSource: any) {}

  async LoadOriginalSourceAsync(originalSource: any, isAdding: boolean) {}

  BeginEdit() {
    this.IsEditing = true;

    const keys = Object.keys(this.ChildNodeGroups);
    for (let index = 0; index < keys.length; index++) {
      const childNodes = this.ChildNodeGroups[keys[index]];
      for (let c_index = 0; c_index < childNodes.length; c_index++) {
        const child = childNodes[c_index];
        if (child == null) continue;
        child.BeginEdit();
      }
    }
  }

  ValidateData() {
    this.ValidationController.validate({ object: this });
  }

  async Validate() {
    const result = await this.ValidationController.results.filter(
      (t) => t.valid
    ).length;
    return result <= 0;
  }

  async ValidateAsync() {
    const result = await this.ValidationController.results.filter(
      (t) => t.valid
    ).length;
    return result <= 0;
  }

  async CancelEditAsync() {
    this.IsEditing = false;

    if (this.HasOriginalSource)
      await this.LoadOriginalSourceAsync(this.OriginalSource, false);

    let childNodes = this.GetChildNode();
    if (childNodes == null || childNodes == "undefined") {
      childNodes = [];
    }
    for (let index = 0; index < childNodes.length; index++) {
      const editor = childNodes[index];
      if (editor.CancelEdit != null) editor.CancelEdit();
    }
  }

  async EndEditAsync() {
    this.IsEditing = false;

    let childNodes = this.GetChildNode();
    if (childNodes == null || childNodes == "undefined") {
      childNodes = [];
    }
    for (let index = 0; index < childNodes.length; index++) {
      const editor = childNodes[index];
      if (editor.EndEditAsync != null) await editor.EndEditAsync();
    }
  }

  async EndItemEditAsync() {
    this.IsItemEditing = false;

    const temp = new Object();
    await this.SaveOriginalSourceAsync(temp);
    await this.SetOriginalSourceAsync(temp, !this.HasOriginalSource);
    let childNodes = this.GetChildNode();
    if (childNodes == null || childNodes == "undefined") {
      childNodes = [];
    }
    for (let index = 0; index < childNodes.length; index++) {
      const editor = childNodes[index];
      if (editor.EndEditAsync != null) await editor.EndEditAsync();
    }
  }

  get errorLength() {
    return this.ValidationController.results.filter((t) => t.valid).length;
  }
}
