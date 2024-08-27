import { inject, bindable, BindingMode, customElement } from "aurelia";
import { BootstrapNavs } from "./fs-navs";


export class BootstrapNavItem {
    @bindable({ mode: BindingMode.twoWay }) public class: string;
    @bindable({ mode: BindingMode.twoWay }) public style: string;

    @bindable({ mode: BindingMode.twoWay }) public href: string;
    @bindable({ mode: BindingMode.twoWay }) public title: string;

    @bindable({ mode: BindingMode.twoWay }) public id: string;

    @bindable() public active: boolean | string = false;
    @bindable({ mode: BindingMode.twoWay }) public disabled: boolean | string =
        false;

    private isFade: boolean = false;

    public element: Element;
    public parent: any;

    constructor(element: Element, parent) {

        this.element = <HTMLElement>element;
        this.parent = parent;
    }

    /*  bind(bindingContext: any, overrideContext: any) {
        this.active = this.active === "true" || this.active === true;
        this.disabled = this.disabled === "true" || this.disabled === true;
        }*/
    bound(initiator: any, parent: any, flags: any) {

        this.active = this.active === "true" || this.active === true;
        this.disabled = this.disabled === "true" || this.disabled === true;
    }
}
