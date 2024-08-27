import numeral from "numeral";
import { valueConverter } from "aurelia";

@valueConverter("currency")
export class CurrencyFormatValueConverter {
  toView(value) {
    if (value != null) {
      return numeral(value).format("(0,0.00)");
    } else {
      return value;
    }
  }

  fromView(val) {
    return Number(val);
  }
}
