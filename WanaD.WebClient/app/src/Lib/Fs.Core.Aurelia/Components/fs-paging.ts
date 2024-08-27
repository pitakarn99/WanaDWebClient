/* eslint-disable @typescript-eslint/no-inferrable-types */
import { bindable, BindingMode } from "aurelia";
import CommonSearchVMBase from "Lib/Fs.SmartClient.Client/CommonSearchVMBase";
import * as uniqid from "uniqid";
import {
    customElement,
    ICustomElementController,
    ICustomElementViewModel,
} from '@aurelia/runtime-html';
import template from './fs-paging.html';
@customElement({
    name: 'fs-paging',
    template: template,
})
export class FsPaging {
    DataContext: CommonSearchVMBase;
    @bindable() public IsDialog: boolean = false;
    Select2Id: string;
    CurrentPageNumber: number;

    public Paging: any[] = [
        { id: 5, text: "5" },
        { id: 10, text: "10" },
        { id: 15, text: "15" },
        { id: 20, text: "20" },
        { id: 30, text: "30" },
        { id: 50, text: "50" },
        { id: 9999999, text: "All" },
    ];


    bound(initiator: any, parent: any, flags: any) {

        this.DataContext = parent.scope.bindingContext;
        this.Select2Id = uniqid.default();
    }

}
