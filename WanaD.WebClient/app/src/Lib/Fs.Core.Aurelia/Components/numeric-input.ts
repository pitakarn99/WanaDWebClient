import {
    customElement,
    BindingMode,
    inject,
    bindable,
    observable,
    TaskQueue,
    PLATFORM,
} from "aurelia";
import numeral from "numeral";

function getNumber(value) {
    // todo: use numbro
    let number = numeral(value).value();
    return !isNaN(number) && isFinite(number) ? number : NaN;
}

@customElement("numeric-input")
export class NumericInput {
    input: any;
    taskQueue: TaskQueue;
    inputElement: any;
    formattedNumber: string;
    isEditing: boolean = false;
    alignClass: string = "text-left";
    customClass: string = "";
    customStyle: string = "";
    @observable({ callback: "displayNumberChanged" }) displayNumber: any;
    @bindable({ mode: BindingMode.twoWay, callback: "valueChanged" })
    value: number = null;
    @bindable({ mode: BindingMode.twoWay }) min: number = null;
    @bindable({ mode: BindingMode.twoWay }) max: number = null;
    @bindable({ mode: BindingMode.twoWay, callback: "formatChanged" })
    format: string;
    @bindable({ mode: BindingMode.twoWay }) disabled: boolean = false;
    @bindable({ mode: BindingMode.twoWay, callback: "alignChanged" })
    align: string = "right";
    @bindable({ mode: BindingMode.twoWay, callback: "classChanged" })
    class: string;
    @bindable({ mode: BindingMode.twoWay, callback: "styleChanged" })
    style: string;
    @bindable({ mode: BindingMode.twoWay }) placeholder: string = null;

    @bindable() Change: Function = null;
    constructor(input, taskQueue) {
        this.input = input;
        this.taskQueue = taskQueue;
    }

    displayNumberChanged(newValue, oldValue) {
        this.value = numeral(newValue).value();
    }

    classChanged(newValue, oldValue) {
        this.customClass = newValue;
    }

    styleChanged(newValue, oldValue) {
        this.customStyle = newValue;
    }

    formatChanged(newValue, oldValue) {
        this.formattedNumber = numeral(this.value).format(newValue);
        if (!this.isEditing) {
            if (this.value != null) {
                this.displayNumber = this.formattedNumber;
            } else {
                this.displayNumber = null;
            }
        }
    }

    alignChanged(newValue, oldValue) {
        if (newValue == "right") {
            this.alignClass = "text-right";
        } else if (newValue == "center") {
            this.alignClass = "text-center";
        } else if (newValue == "justify") {
            this.alignClass = "text-justify";
        } else {
            this.alignClass = "text-left";
        }
    }

    ignoreValueChanged = false;
    valueChanged(newValue, oldValue) {
        if (this.ignoreValueChanged) return;
        this.ignoreValueChanged = true;
        if (newValue != null) {
            if (this.min != null && newValue < this.min) {
                this.value = this.min;
            }
            if (this.max != null && newValue > this.max) {
                this.value = this.max;
            }
            this.formattedNumber = numeral(this.value).format(this.format);
            if (!this.isEditing) {
                this.displayNumber = this.formattedNumber;
            }
        } else {
            this.formattedNumber = null;
            if (!this.isEditing) {
                this.displayNumber = null;
            }
        }
        var self = this;
        PLATFORM.domWriteQueue.queueTask(() => {
            // Update styles or DOM
            self.ignoreValueChanged = false;
        });
    }

    attached() {
        if (this.value != null) {
            this.formattedNumber = numeral(this.value).format(this.format);
            this.displayNumber = this.formattedNumber;
        } else {
            this.formattedNumber = null;
            this.displayNumber = null;
        }
    }

    focus = () => {
        this.displayNumber = this.value;
        this.isEditing = true;
    };

    blur = () => {
        this.displayNumber = this.formattedNumber;
        this.isEditing = false;

        if (this.Change != null) {
            this.Change();
        }
    };
}
