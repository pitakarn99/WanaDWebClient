import { transient, inject } from "aurelia";
import { DI, IContainer, resolve } from "aurelia";

export default class TabViewModel {
  container: IContainer = resolve(IContainer);
  Header: string;
  ChildNodeGroups: any[] = [];

  constructor() {}

  GetChildNode(groupName = null) {
    if (groupName == null) groupName = "default";

    if (!this.ChildNodeGroups.hasOwnProperty(groupName)) {
      this.ChildNodeGroups[groupName] = [];
    }

    return this.ChildNodeGroups[groupName];
  }

  async OnCurrentChangedAsync(sender, e) {}

  ClearChildNode(groupName = null) {
    if (groupName == null) groupName = "default";

    if (this.ChildNodeGroups.hasOwnProperty(groupName)) {
      this.ChildNodeGroups[groupName] = [];
    }
  }

  AddChildNode(node, groupName = null) {
    if (groupName == null) groupName = "default";
    if (!this.ChildNodeGroups.hasOwnProperty(groupName)) {
      this.ChildNodeGroups[groupName] = [];
    }
    this.ChildNodeGroups[groupName].push(node);
  }

  RemoveChildNode(node, groupName = null) {
    if (groupName == null) groupName = "default";

    for (var i = 0; i < this.ChildNodeGroups.length; i++) {
      if (this.ChildNodeGroups[i] === node) {
        this.ChildNodeGroups.splice(i, 1);
      }
    }
  }
}
