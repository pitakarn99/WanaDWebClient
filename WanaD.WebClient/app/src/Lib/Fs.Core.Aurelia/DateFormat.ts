import moment from "moment";
import { valueConverter } from "aurelia";

@valueConverter("dateFormat")
export class DateFormatValueConverter {
  toView(value, format) {
    if (format != null && value != null) {
      return moment(value).format(format);
    } else {
      return value;
    }
  }
}
