import { bindable, customElement } from "aurelia";
import CommonSearchVMBase from "Lib/Fs.SmartClient.Client/CommonSearchVMBase";
@customElement("fs-grid-header")
export class FsGridHeaderCustomElement {
    @bindable() DataContext: CommonSearchVMBase;
    @bindable() SortingName: string;
    @bindable() DisplayName: string;
    @bindable() TranslateKey: string;




    bound(initiator: any, parent: any, flags: any) {

        if (this.DataContext == null) {
            this.DataContext = parent.scope.bindingContext;
        }
    }
}