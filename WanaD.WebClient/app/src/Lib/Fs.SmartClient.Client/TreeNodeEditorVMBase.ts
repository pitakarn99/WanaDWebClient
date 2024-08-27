import EditorVMBase from "./EditorVMBase";

export default class TreeNodeEditorVMBase extends EditorVMBase {
    isLoadOnDemandEnable: boolean = true;
    name: string;
    expanded: boolean = true;
    visible: boolean = true;
    icon: string;

    ToggleNode() {
        for (var i = 0; i < this.SubTreeNodes.length; i++) {
            this.SubTreeNodes[i].visible = !this.SubTreeNodes[i].visible;
        }
        this.expanded = !this.expanded;
        if (this.expanded === true) {
            this.icon = 'fa fa-minus';
        }
        else {
            this.icon = 'fa fa-plus';
        }
        if (this.SubTreeNodes.length == 0) {
            this.PrepareSubTree();
        }
    }

    get SubTreeNodes() {
        return this.GetChildNode("SubTreeNodes");
    }

    ClearSubTree() {
        return this.ClearChildNode("SubTreeNodes");
    }

    AddSubTreeNode(node: any) {
        this.AddChildNode(node, "SubTreeNodes");
    }

    RemoveSubTreeNode(node: any) {
        this.RemoveChildNode(node, "SubTreeNodes");
    }

    PrepareSubTree() {

    }
}