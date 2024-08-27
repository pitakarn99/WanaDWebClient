import moment from "moment";

export class SortValueConverter {
  toView(array, propertyName, direction) {
    console.log("sort: prop: " + propertyName + " direction: " + direction);

    var factor = direction === "ascending" ? 1 : -1;
    return array.slice(0).sort((a, b) => {
      return (a[propertyName] - b[propertyName]) * factor;
    });
  }
}
