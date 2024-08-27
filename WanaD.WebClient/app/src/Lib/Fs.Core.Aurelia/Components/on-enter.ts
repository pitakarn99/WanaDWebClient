import { customAttribute } from "aurelia";

@customAttribute("on-enter")
export class OnEnter {
  constructor(element: Element) {
    this.element = element;
    this.onEnter = (ev: KeyboardEvent) => {
      //Enter keyCode is 13
      if (ev.keyCode !== 13) return;
      this.action();
    };
  }
  element: Element;
  attached() {
    this.element.addEventListener("keyup", this.onEnter);
  }
  onEnter;

  action;
  valueChanged(func) {
    this.action = func;
  }

  detached() {
    this.element.removeEventListener("keyup", this.onEnter);
  }
}
