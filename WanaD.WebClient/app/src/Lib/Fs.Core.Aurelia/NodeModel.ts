export class NodeModel {
  name: string;
  data: any;
  children: NodeModel[];
  visible: boolean;
  icon: string;
  expanded: boolean;
  constructor(name: string, data: any, children: NodeModel[]) {
    this.name = name;
    this.data = data;
    this.children = children || [];
    this.visible = true;
    if (this.hasChildren()) {
      this.icon = "fa fa-minus";
      this.expanded = true;
    }
  }
  hasChildren() {
    return this.children.length > 0;
  }
  toggleNode() {
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].visible = !this.children[i].visible;
    }
    this.expanded = !this.expanded;
    if (this.expanded === true) {
      this.icon = "fa fa=minus";
    } else {
      this.icon = "fa fa-plus";
    }
  }
}
