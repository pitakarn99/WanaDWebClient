import numeral from "numeral";
import { valueConverter } from "aurelia";

@valueConverter("number")
export class NumberFormatValueConverter {
  toView(value, format) {
    if (format != null && value != null) {
      return numeral(value).format(format);
    } else {
      return value;
    }
  }

  fromView(val) {
    return Number(val);
  }
}
