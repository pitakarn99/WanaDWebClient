import { inject, bindable, BindingMode } from "aurelia";

import { BootstrapNavItem } from "./fs-nav-item";

export class BootstrapNavItemBody {
    @bindable({ mode: BindingMode.twoWay }) public class: string;
    @bindable({ mode: BindingMode.twoWay }) public style: string;

    @bindable({ mode: BindingMode.twoWay }) public href: string;
    @bindable({ mode: BindingMode.twoWay }) public title: string;

    @bindable() public active: boolean | string = false;
    @bindable({ mode: BindingMode.twoWay }) public disabled: boolean | string =
        false;

    private isFade: boolean = false;

    public parent: any;

    public element: Element;

    public tab_body: any;

    constructor(element: Element, parent) {
        this.parent = parent;
        this.element = element;
        
    }


    bound(initiator: any, parent: any, flags: any) {
        
        this.active = this.parent.active;
        this.disabled = this.parent.disabled;

        let navs: HTMLElement;
        navs = this.tab_body.parentElement;

        let tab_content: HTMLElement;
        tab_content = <HTMLElement>(
            navs.parentElement.parentElement.children.item(1).children.item(0)
        );

        let tab_body_id = `${this.parent.id}-tab-body`;
        navs.removeChild(this.tab_body);

        if (this.tab_body.textContent.length > 8) {
            this.tab_body.setAttribute("id", `${tab_body_id}`);
            this.tab_body.setAttribute("aria-labelledby", `${this.parent.id}`);

            tab_content.appendChild(this.tab_body);
        }
    }
}
