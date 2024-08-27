/* eslint-disable no-var */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  
  bindable,
  BindingMode,
  children,
  customElement,
    PLATFORM,
} from "aurelia";


export class BootstrapNavs {
  @bindable({ mode: BindingMode.twoWay })
  public navsVerticalClass: string = "col-sm-3";
  @bindable({ mode: BindingMode.twoWay })
  public contentVerticalClass: string = "col-sm-9";

  @bindable({ mode: BindingMode.twoWay })
  public navsClass: string;
  @bindable({ mode: BindingMode.twoWay })
  public navsStyle: string;

  @bindable({ mode: BindingMode.twoWay })
  public contentClass: string;
  @bindable({ mode: BindingMode.twoWay })
  public contentStyle: string;

  @bindable({ mode: BindingMode.twoWay }) public bsShow: Function;
  @bindable({ mode: BindingMode.twoWay }) public bsHide: Function;
  @bindable({ mode: BindingMode.twoWay }) public bsShown: Function;
  @bindable({ mode: BindingMode.twoWay }) public bsHidden: Function;

  @bindable({ mode: BindingMode.twoWay }) public tabs: boolean | string = false;
  @bindable({ mode: BindingMode.twoWay }) public pills: boolean | string =
    false;
  @bindable({ mode: BindingMode.twoWay }) public vertical: boolean | string =
    false;
  @bindable({ mode: BindingMode.twoWay }) public justify: boolean | string =
    false;
  @bindable({ mode: BindingMode.twoWay }) public fill: boolean | string = false;

  private beTab: boolean = true;
  private bePills: boolean = false;

  constructor(private element: Element) {}

  private attached() {
    const onlyPillsAttribute =
      this.pills === "" && this.element.hasAttribute("pills");
    this.pills = onlyPillsAttribute || this.pills.toString() === "true";

    const onlyTabsAttribute =
      this.tabs === "" && this.element.hasAttribute("tabs");
    this.tabs = onlyTabsAttribute || this.tabs.toString() === "true";

    const onlyVerticalAttribute =
      this.vertical === "" && this.element.hasAttribute("vertical");
    this.vertical =
      onlyVerticalAttribute || this.vertical.toString() === "true";

    const onlyJustifiedAttribute =
      this.justify === "" && this.element.hasAttribute("justify");
    this.justify = onlyJustifiedAttribute || this.justify.toString() === "true";

    const onlyFillAttribute =
      this.fill === "" && this.element.hasAttribute("fill");
    this.fill = onlyFillAttribute || this.fill.toString() === "true";

    this.beTab = this.tabs;
    this.bePills = this.pills;

    if (this.justify && this.fill) {
      let error = new Error(
        `The [abt-navs] should have either 'fill' or 'justify' attributes, and not both of them simultaneously.`
      );
      throw error;
    }
      var self = this;
      
      PLATFORM.taskQueue.queueTask(() => {
          // Update styles or DOM
          self.afterAttached();
      });
     /* window.requestAnimationFrame(() => {
          self.afterAttached();
      });*/

  }

    private afterAttached() {
    // let children = this.element.children.item(0).children.item(0).getElementsByTagName('a[active]');
    // console.log( children.length );
    // $(children).tab('show');
//    this.handle_events();
    }
    bound(initiator: any, parent: any, flags: any) {
      
       // var yy = initiator.scope.bindingContext.parentmethod();
       // this.handle_events();
    }
    @children('div') divs
    @children('a') as
  private handle_events() {
      // all a tags which are going to be tabs/pills
      
    let children = this.element.children
      .item(0)
      .children.item(0)
      .getElementsByTagName("a");

    if (this.bsShow) {
      $(children).on("show.bs.tab", (event: any) => {
        if (this.bsShow) {
          this.bsShow({
            activeTab: event.target,
            prevTab: event.relatedTarget,
          });
        }
      });
    }

    if (this.bsShown) {
      $(children).on("shown.bs.tab", (event: any) => {
        if (this.bsShown) {
          this.bsShown({
            activeTab: event.target,
            prevTab: event.relatedTarget,
          });
        }
      });
    }

    if (this.bsHide) {
      $(children).on("hide.bs.tab", (event: any) => {
        if (this.bsHide) {
          this.bsHide({
            activeTab: event.target,
            prevTab: event.relatedTarget,
          });
        }
      });
    }

    if (this.bsHidden) {
      $(children).on("hidden.bs.tab", (event: any) => {
        if (this.bsHidden) {
          this.bsHidden({
            activeTab: event.target,
            prevTab: event.relatedTarget,
          });
        }
      });
    }
  }

  private detached() {
    let children = this.element.children
      .item(0)
      .children.item(0)
      .getElementsByTagName("a");
    $(children).off("show.bs.tab");
    $(children).off("shown.bs.tab");
    $(children).off("hide.bs.tab");
    $(children).off("hidden.bs.tab");
    $(children).tab("dispose");
  }
}
