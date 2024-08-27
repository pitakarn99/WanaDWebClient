/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-this-alias */
import TabViewModel from "Lib/Fs.SmartClient.Client/TabViewModel";

//import { BindingEngine } from "aurelia-binding";
import { newInstanceForScope } from "@aurelia/kernel";
import { IObserverLocator, resolve } from "aurelia";
import { IValidationRules } from "@aurelia/validation";
import { IValidationController } from "@aurelia/validation-html";
export default class EditableContainerBase extends TabViewModel {
  Parent: EditableContainerBase;
  IsFullLoad: boolean = false;
  IsEditing: boolean = false;

  ErrorList: string[];

  HasEditingChilds: boolean = false;
  AllowDelete: boolean = true;
  CanDeleteItem: boolean = false;
  AllowEdit: boolean = false;
  CanEdit: boolean = false;
  observerLocator = resolve(IObserverLocator) as IObserverLocator;
  CanEditSubscribe: any;
  HasEditingChildsSubscribe: any;
  Id: string;
  ValidationController = resolve(
    newInstanceForScope(IValidationController)
  ) as IValidationController;
  ValidationRules = resolve(IValidationRules) as IValidationRules;
  constructor() {
    super();
  }

  SetIsEditing(isEditing: boolean) {
    this.IsEditing = isEditing;
    this.CalculateHasEditingChilds();
  }

  CalculateCanEdit() {
    if (!this.AllowEdit) this.CanEdit = false;
    else if (this.Parent != null) this.CanEdit = this.Parent.CanEdit;
    else this.CanEdit = this.AllowEdit;
  }

  CalculateHasEditingChilds() {
    if (this.IsEditing) {
      this.HasEditingChilds = true;
    } else {
      this.HasEditingChilds = this.CheckEditingChilds();
    }
  }

  CheckEditingChilds() {
    const keys = Object.keys(this.ChildNodeGroups);
    for (let index = 0; index < keys.length; index++) {
      const childNodes = this.ChildNodeGroups[keys[index]];
      for (let c_index = 0; c_index < childNodes.length; c_index++) {
        const child = childNodes[c_index];
        if (child == null) continue;
        if (child.HasEditingChilds != null && child.HasEditingChilds)
          return true;
      }
    }
    return false;
  }

  PrepareChildVMsAsync() {}

  async FullLoadAsync() {
    this.ClearChildNode();
    await this.PrepareChildVMsAsync();
    if (this.ChildVMsPreparing != null) this.ChildVMsPreparing(this, null);

    this.IsFullLoad = true;
  }

  async ActivateAsync() {
    if (!this.IsFullLoad) this.FullLoadAsync();
  }

  ChildVMsPreparing(sender, e) {}

  OnParentPropertyChanged() {
    this.CalculateCanEdit();
  }
  funtionHasEditingChildsSubscribe() {
    this.CalculateHasEditingChilds();
    this.CanDeleteItem = !this.HasEditingChilds;
  }
  funtionCanEditSubscribe() {
    this.OnParentPropertyChanged();
  }
  AddChildNode(node, groupName = null) {
    if (groupName == null) groupName = "default";

    super.AddChildNode(node, groupName);

    const self = this;

    node.HasEditingChildsSubscribe = this.observerLocator
      .getObserver(node, "HasEditingChilds")
      .subscribe({
        handleChange: (newValue, oldValue) => {
          self.CalculateHasEditingChilds();
          self.CanDeleteItem = !self.HasEditingChilds;
        },
      });

    node.CanEditSubscribe = this.observerLocator
      .getObserver(node, "CanEdit")
      .subscribe({ handleChange: (newValue, oldValue) => {} });

      node.Parent = self;

      if (node.OnParentPropertyChanged) {
          self.CanEditSubscribe = this.observerLocator
              .getObserver(this, "CanEdit")
              .subscribe(node.OnParentPropertyChanged);
      }

    if (node.CalculateCanEdit) node.CalculateCanEdit();
  }

  RemoveChildNode(node, groupName) {
    if (groupName == null) groupName = "default";

    super.RemoveChildNode(node);

    if (node.HasEditingChildsSubscribe != null)
      node.HasEditingChildsSubscribe.dispose();

    if (node.CanEditSubscribe != null) node.CanEditSubscribe.dispose();
  }
  validateErrors: any[];

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
  ValidateData() {
    this.ValidationController.validate({ object: this });
  }

  async Validate() {
    const result = await this.ValidationController.results.filter(
      (t) => t.valid
    ).length;
    return result <= 0;
  }
}
