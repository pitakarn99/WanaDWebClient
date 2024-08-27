/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, bindable, BindingMode, customElement } from "aurelia";

import { BootstrapNavItem } from "./fs-nav-item";

export class BootstrapNavItemHeader {
    @bindable({ mode: BindingMode.twoWay }) public class: string;
    @bindable({ mode: BindingMode.twoWay }) public style: string;

    @bindable({ mode: BindingMode.twoWay }) public href: string;
    @bindable({ mode: BindingMode.twoWay }) public title: string;

    @bindable() public active: boolean | string = false;
    @bindable({ mode: BindingMode.twoWay }) public disabled: boolean | string =
        false;

    private isFade = false;

    public parent: any;

    private element: HTMLElement;

    public tab_header: any;

    constructor(element: Element, parent) {

        this.parent = parent;
        this.element = <HTMLElement>element;
    }


    bound(initiator: any, parent: any, flags: any) {

        this.active = this.parent.active;
        this.disabled = this.parent.disabled;

        let navs: HTMLElement;

        navs = this.tab_header.parentElement;

        let navComponent: HTMLElement;

        const tab_body_id = `${this.parent.id}-tab-body`;

        this.isFade = true;

        const data_toggle = "tab";

        this.tab_header.setAttribute("data-toggle", data_toggle);

        this.tab_header.setAttribute("role", "tab");
        this.tab_header.setAttribute("aria-controls", `${tab_body_id}`);
        this.tab_header.setAttribute("aria-selected", `${this.active}`);

        this.tab_header.setAttribute("href", `#${tab_body_id}`);
    }
}
