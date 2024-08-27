import { inject, bindable, BindingMode } from "aurelia"; // eslint-disable-line no-unused-vars

import moment from "moment";
import $ from "jquery";
import "./bootstrap-datetimepicker.js";
import { globalPickerOptions, globalExtraOptions } from "./PickerGlobalOptions";

@inject(Element)
export class FsDatetimePickerCustomElement {
  @bindable({ mode: BindingMode.twoWay }) element;
  @bindable({ mode: BindingMode.twoWay, callback: "modelChanged" }) model;
  @bindable({ mode: BindingMode.twoWay, callback: "valueChanged" }) value;
  @bindable() placeholder = "";

  // plugin own variables
  @bindable() icon = "fa fa-calendar";
  @bindable() iconBase = globalExtraOptions.iconBase;
  @bindable() withIcon = globalExtraOptions.withDateIcon;
  @bindable() withInput = true;
  @bindable() bootstrapVersion = globalExtraOptions.bootstrapVersion;
  @bindable() buttonClass = globalExtraOptions.buttonClass;
  @bindable() readonly = false;
  // picker options
  @bindable({ mode: BindingMode.twoWay, callback: "optionsChanged" })
  options: any = {};

  // events (from the View)
  @bindable() onHide;
  @bindable() onShow;
  @bindable() onChange;
  @bindable() onError;
  @bindable() onUpdate;

  // variables
  _originalValue;
  _originalDateFormat;
  _originalDateObject;
  _events: any = {};
  _methods: any = {};
  _format;

  elm: any;
  input: any;
  domElm: any;
  constructor(elm) {
    this.elm = elm;

    // ensure the element exposes a "focus" method for Aurelia-Validation
    elm.focus = () => this.input.focus();
  }

  attached() {
    // reference to the DOM element
    this.domElm = $(this.elm).find(".date");

    // add base icons, unless user already added some
    let pickerOptions = this.options || {};
    if (!this.options || (this.options && !this.options.icons)) {
      pickerOptions.icons = this.attachIconBase();
    }

    // attach/expose some options
    this.applyExposeEvents();
    this.exposeMethods();

    // finally create the datepicker with all options
    this.options = Object.assign({}, globalPickerOptions, pickerOptions);
    this.domElm.datetimepicker(this.options);

    // update Value & Model binding on a Date picker changed (watch)
    this.domElm.on("dp.change", (e) => {
      if (moment(e.date, this._format, true).isValid()) {
        this.model = moment(e.date, this._format, true).toDate();

        if (this.options.useBuddhistYear) {
          var christianYear = moment(e.date).format("YYYY");
          var buddhistYear = (parseInt(christianYear) + 543).toString();
          //this.value = moment(e.date, this._format, true).format(this._format);
          this.value = moment(e.date, this._format, true)
            .format(
              this._format
                .replace("YYYY", buddhistYear)
                .replace("YY", buddhistYear.substring(2, 4))
            )
            .replace(christianYear, buddhistYear);
        } else {
          this.value = moment(e.date, this._format, true).format(this._format);
        }
      } else if (!e.date) {
        this.model = null;
        this.value = null;
      }
    });

    // expose the element object to the outside
    // this will be useful for calling events/methods/options from the outside
    this.element = {
      events: this._events,
      options: pickerOptions,
      methods: this._methods,
    };
  }

  attachIconBase() {
    let icons;

    if (this.iconBase === "font-awesome") {
      icons = {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-arrow-up",
        down: "fa fa-arrow-down",
        previous: "fa fa-chevron-left",
        next: "fa fa-chevron-right",
        today: "fa fa-calendar-check-o",
        clear: "fa fa-trash",
        close: "fa fa-window-close",
      };
    } else if (this.iconBase === "font-awesome-5") {
      icons = {
        time: "far fa-clock",
        date: "fas fa-calendar-alt",
        up: "fas fa-arrow-up",
        down: "fas fa-arrow-down",
        previous: "fas fa-chevron-left",
        next: "fas fa-chevron-right",
        today: "far fa-calendar-check",
        clear: "fas fa-trash",
        close: "fas fa-window-close",
      };
    } else {
      icons = {
        time: "glyphicon glyphicon-time",
        date: "glyphicon glyphicon-calendar",
        up: "glyphicon glyphicon-chevron-up",
        down: "glyphicon glyphicon-chevron-down",
        previous: "glyphicon glyphicon-chevron-left",
        next: "glyphicon glyphicon-chevron-right",
        today: "glyphicon glyphicon-screenshot",
        clear: "glyphicon glyphicon-trash",
        close: "glyphicon glyphicon-remove",
      };
    }
    return icons;
  }

  /**
   * Keep original value(s) that could be passed by the user ViewModel.
   */
  bound() {
    // get the picker options (priority is Global Options first, then user option which could overwrite the Global options)
    let pickerOptions = this.options || this.elm.getAttribute("options");
    this.options = Object.assign({}, globalPickerOptions, pickerOptions);

    if (this.options) {
      this._format = this._originalDateFormat = this.options.hasOwnProperty(
        "format"
      )
        ? this.options.format
        : "YYYY-MM-DD";
    }
    if (this.model) {
      this._originalDateObject =
        moment(this.model, this._format, true).toDate() ||
        this.elm.getAttribute("model");
    }
    this._originalValue = this.value || this.elm.getAttribute("value");
    let value = this._originalValue || this._originalDateObject;

    if (value && moment(value, this._format, true).isValid()) {
      if (!this.model) {
        this.model = moment(value, this._format, true).toDate();
      }
      if (!this.value) {
        if (this.options.useBuddhistYear) {
          var christianYear = moment(value).format("YYYY");
          var buddhishYear = (parseInt(christianYear) + 543).toString();
          //this.value = moment(value, this._format, true);
          this.value = moment(value, this._format, true)
            .format(
              this._format
                .replace("YYYY", buddhishYear)
                .replace("YY", buddhishYear.substring(2, 4))
            )
            .replace(christianYear, buddhishYear);
        } else {
          this.value = moment(value, this._format, true).format(this._format);
        }
      }
    }
  }

  /**
   * Apply/expose datetimepicker events
   * Each event has 2 ways of triggering an event (from the View as an attribute or from the ViewModel has a function call)
   */

  dpOpen: boolean;
  applyExposeEvents() {
    var self = this;
    this.domElm.on("dp.hide", (e) => {
      if (typeof this.onHide === "function") {
        this.onHide(e);
      }
      if (typeof this._events.onHide === "function") {
        this._events.onHide(e);
      }
      if (!this.parseBool(this.withInput)) {
        self.dpOpen = false;
      }
    });

    this.domElm.on("dp.show", (e) => {
      if (typeof this.onShow === "function") {
        this.onShow(e);
      }
      if (typeof this._events.onShow === "function") {
        this._events.onShow(e);
      }

      if (!this.parseBool(this.withInput)) {
        $(document).on("click", function () {
          if (self.dpOpen) {
            self.domElm.data("DateTimePicker").hide();
          }
        });
        self.dpOpen = true;
      }
    });

    this.domElm.on("dp.change", (e) => {
      if (typeof this.onChange === "function") {
        this.onChange(e);
      }
      if (typeof this._events.onChange === "function") {
        this._events.onChange(e);
      }
    });

    this.domElm.on("dp.error", (e) => {
      if (typeof this.onError === "function") {
        this.onError(e);
      }
      if (typeof this._events.onError === "function") {
        this._events.onError(e);
      }
    });

    this.domElm.on("dp.update", (e) => {
      if (typeof this.onUpdate === "function") {
        this.onUpdate(e);
      }
      if (typeof this._events.onUpdate === "function") {
        this._events.onUpdate(e);
      }
    });
  }

  /**
   * forward "blur" events to the custom element
   * As described in Aurelia-Validation
   * https://www.danyow.net/aurelia-validation-alpha/
   */
  blur() {
    // const event = DOM.createCustomEvent("blur");
    // this.elm.dispatchEvent(event);//ไว้มาแก้
  }

  /**
   * Construct a method by it's type and name
   * We do this to avoid typing multiple line of the same, on 100 functions that makes a big difference in number of code lines.
   */
  constructMethod(methodType, methodName) {
    switch (methodType) {
      case "getterSetter":
        return (value) => {
          if (value) {
            return this.domElm.data("DateTimePicker")[methodName](value);
          }
          return this.domElm.data("DateTimePicker")[methodName]();
        };
      case "caller":
      case "getter":
      default:
        return (value) => {
          return this.domElm.data("DateTimePicker")[methodName]();
        };
    }
  }

  /**
   * Expose datetimepicker methods
   */
  exposeMethods() {
    // prepare a list of methods with their type so we can construct them later
    let methodList = [
      { name: "allowInputToggle", type: "getterSetter" },
      { name: "calendarWeeks", type: "getterSetter" },
      { name: "clear", type: "caller" },
      { name: "collapse", type: "getterSetter" },
      { name: "date", type: "getterSetter" },
      { name: "daysOfWeekDisabled", type: "getterSetter" },
      { name: "dayViewHeaderFormat", type: "getterSetter" },
      { name: "defaultDate", type: "getterSetter" },
      { name: "destroy", type: "caller" },
      { name: "debug", type: "caller" },
      { name: "disable", type: "caller" },
      { name: "disabledDates", type: "getterSetter" },
      { name: "disabledHours", type: "getterSetter" },
      { name: "disabledTimeIntervals", type: "getterSetter" },
      { name: "enable", type: "caller" },
      { name: "enabledDates", type: "getterSetter" },
      { name: "enabledHours", type: "getterSetter" },
      { name: "extraFormats", type: "getterSetter" },
      { name: "focusOnShow", type: "getterSetter" },
      { name: "format", type: "getterSetter" },
      { name: "hide", type: "caller" },
      { name: "icons", type: "getterSetter" },
      { name: "ignoreReadonly", type: "getterSetter" },
      { name: "inline", type: "getterSetter" },
      { name: "keepInvalid", type: "getterSetter" },
      { name: "keyBinds", type: "getterSetter" },
      { name: "locale", type: "getterSetter" },
      { name: "maxDate", type: "getterSetter" },
      { name: "minDate", type: "getterSetter" },
      { name: "options", type: "getterSetter" },
      { name: "parseInputDate", type: "getterSetter" },
      { name: "show", type: "caller" },
      { name: "showClear", type: "getterSetter" },
      { name: "showClose", type: "getterSetter" },
      { name: "showTodayButton", type: "getterSetter" },
      { name: "sideBySide", type: "getterSetter" },
      { name: "stepping", type: "getterSetter" },
      { name: "toggle", type: "caller" },
      { name: "toolbarplacement", type: "getterSetter" },
      { name: "tooltips", type: "getterSetter" },
      { name: "useCurrent", type: "getterSetter" },
      { name: "useStrict", type: "getterSetter" },
      { name: "viewDate", type: "getterSetter" },
      { name: "viewMode", type: "getterSetter" },
      { name: "widgetPositioning", type: "getterSetter" },
    ];

    // loop through all methods and construct them before exponsing them to the element object
    let methods = {};
    methodList.forEach((method) => {
      methods[method.name] = this.constructMethod(method.type, method.name);
    });

    this._methods = methods;
  }

  detached() {
    if (
      this.domElm &&
      this.domElm.data("DateTimePicker") &&
      this.domElm.data("DateTimePicker").destroy
    ) {
      this.domElm.data("DateTimePicker").destroy();
    }
  }

  getOption(optionName) {
    let domElm = $(this.elm).find(".input-group.date");
    if (
      domElm &&
      typeof domElm.data === "function" &&
      domElm.data("DateTimePicker")
    ) {
      let options = domElm.data("DateTimePicker").options();
      return options.hasOwnProperty(optionName) ? options[optionName] : null;
    }
    return null;
  }

  modelChanged() {
    if (
      !moment(this.model, this._format, true).isValid() &&
      this.model !== null
    ) {
      throw new Error("Datetimepicker, model.bind must be of type Date");
    }
    if (this.model) {
      if (this.options.useBuddhistYear) {
        const christianYear = moment(this.model).format("YYYY");
        const buddhishYear = (parseInt(christianYear) + 543).toString();
        this.value = moment(this.model, this._format, true)
          .format(
            this._format
              .replace("YYYY", buddhishYear)
              .replace("YY", buddhishYear.substring(2, 4))
          )
          .replace(christianYear, buddhishYear);
      } else {
        this.value = moment(this.model, this._format, true).format(
          this._format
        );
      }
      //this.value = moment(this.value, this._format, true).format(this._format);
    } else {
      this.value = null;
    }
  }

  optionsChanged() {
    if (this.options && this.domElm && this.domElm.data("DateTimePicker")) {
      const newFormat = this.options.format;
      if (
        newFormat &&
        this._format !== newFormat &&
        moment(this.model, newFormat).isValid()
      ) {
        this._format = newFormat;
        this.model = moment(this.model, this._format).toDate();
      }
      this.domElm.data("DateTimePicker").options(this.options);
    }
  }

  valueChanged() {
    if (this.value) {
      if (moment(this.value, this._format, true).isValid()) {
        if (this.options.useBuddhistYear) {
          const buddhistYear = moment(this.value, this._format, true).format(
            "YYYY"
          );
          const christianYear = (parseInt(buddhistYear) - 543).toString();
          const value = moment(this.value, this._format, true)
            .format(
              this._format
                .replace("YYYY", christianYear)
                .replace("YY", christianYear.substring(2, 4))
            )
            .replace(buddhistYear, christianYear);

          this.model = moment(value, this._format, true).toDate();
        } else {
          this.model = moment(this.value, this._format, true).toDate();
        }
      }
    }
  }

  parseBool(value) {
    return /^(true|1)$/i.test(value);
  }

  showCalendar() {
    this.domElm.data("DateTimePicker").toggle();
  }
}
