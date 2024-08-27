/* eslint-disable no-var */
import { DI } from "aurelia";
import { fs } from "./../../Config/FsConfig";
import "bootstrap";
import $ from "jquery";
import { UserManager } from "oidc-client-ts";
import OidcConfig from "../../Config/open-id-connect-configuration";
export default class FsUtility {
    static SortObject(data, key) {
        var result = data.sort((a, b) => {
            var nameA = a[key].toLowerCase(),
                nameB = b[key].toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
        return result;
    }

    static GetDisplayYear(year) {
        if (year == null) return;

        return year + fs.Config.YearOffset;
    }

    static ParseDate(value, format) {
        if (value == null || value == "" || typeof value == "undefined") {
            return null;
        }

        var dt;

        if (value instanceof Date) {
            dt = new Date(value.getTime());
        } else if (value.indexOf("/Date(") == 0) {
            var pattern = /Date\(([^)]+)\)/;
            var results = pattern.exec(value);
            dt = new Date(parseFloat(results[1]));
        } else {
            value = value + "";
            var cut_pos =
                value.lastIndexOf(".") == -1 ? value.length : value.lastIndexOf(".");
            var offset_plus_pos = value.lastIndexOf("+");
            var offset_minus_pos = value.lastIndexOf("-");

            var offset = "";
            if (offset_plus_pos != -1 && offset_plus_pos > cut_pos) {
                offset = value.substring(offset_plus_pos);
            } else if (offset_minus_pos != -1 && offset_minus_pos > cut_pos) {
                offset = value.substring(offset_minus_pos);
            }

            value = value.substring(0, cut_pos) + offset;
            //value = value.replace(/T/gi, " ");
            //value = value.replace(/-/gi, "/");
            dt = new Date();
            dt.setTime(Date.parse(value));
        }

        if (format == 1) {
            //dd mm yyyy
            return this.GetDateFormat1(dt);
        } else if (format == 2) {
            return this.GetDateFormat2(dt);
        } else if (format == 3) {
            return this.GetDateFormat3(dt);
        } else if (format == 4) {
            return this.GetDateFormat4(dt);
        }
        return dt;
    }

    static GetDateFormat1(dateobject: Date) {
        if (dateobject == null || typeof dateobject == "undefined")
            var date = new Date();
        else {
            var date = dateobject;
            if (date == null) return null;
        }

        var day = date.getDate();
        var dayString = day.toString();
        if (day < 10) dayString = "0" + day;
        var month = date.getMonth() + 1;
        var monthString = month.toString();
        if (month < 10) monthString = "0" + month;
        var year = date.getFullYear();

        if (fs.Config.YearOffset != null) year = this.GetDisplayYear(year);

        return dayString + "/" + monthString + "/" + year;
    }

    static GetDateFormat2(dateobject: Date) {
        if (dateobject == null || typeof dateobject == "undefined")
            var date = new Date();
        else {
            var date = dateobject;
            if (date == null) return null;
        }

        var day = date.getDate();
        var dayString = day.toString();
        if (day < 10) dayString = "0" + day;
        var month = date.getMonth() + 1;
        var monthString = month.toString();
        if (month < 10) monthString = "0" + month;
        var year = date.getFullYear();
        if (fs.Config.YearOffset != null) year = this.GetDisplayYear(year);

        var hour = date.getHours();
        var hourString = hour.toString();
        if (hour < 10) hourString = "0" + hour;
        var minute = date.getMinutes();
        var minuteString = minute.toString();
        if (minute < 10) minuteString = "0" + minute;
        var second = date.getSeconds();
        var secondString = second.toString();
        if (second < 10) secondString = "0" + second;

        return (
            dayString +
            "/" +
            monthString +
            "/" +
            year +
            " " +
            hourString +
            ":" +
            minuteString
        );
    }

    static GetDateFormat3(dateobject: Date) {
        if (dateobject == null || typeof dateobject == "undefined")
            var date = new Date();
        else {
            var date = dateobject;
            if (date == null) return null;
        }

        var day = date.getDate();
        var dayString = day.toString();
        if (day < 10) dayString = "0" + day;
        var month = date.getMonth() + 1;
        var monthString = month.toString();
        if (month < 10) monthString = "0" + month;
        var year = date.getFullYear();
        var hour = date.getHours();
        var hourString = hour.toString();
        if (hour < 10) hourString = "0" + hour;
        var minute = date.getMinutes();
        var minuteString = minute.toString();
        if (minute < 10) minuteString = "0" + minute;
        var second = date.getSeconds();
        var secondString = second.toString();
        if (second < 10) secondString = "0" + second;

        return (
            dayString +
            "/" +
            monthString +
            "/" +
            year +
            " " +
            hourString +
            ":" +
            minuteString +
            ":" +
            secondString
        );
    }

    static GetDateFormat4(dateobject: Date) {
        if (dateobject == null || typeof dateobject == "undefined")
            var date = new Date();
        else {
            var date = dateobject;
            if (date == null) return null;
        }

        var day = date.getDate();
        var dayString = day.toString();
        if (day < 10) dayString = "0" + day;
        var month = date.getMonth() + 1;
        var monthString = month.toString();
        if (month < 10) monthString = "0" + month;
        var year = date.getFullYear();

        if (fs.Config.YearOffset != null) year = this.GetDisplayYear(year);

        return dayString + "-" + monthString + "-" + year;
    }

    static CreateDateObject(datestring) {
        if (datestring instanceof Date) {
            return datestring;
        } else if (
            datestring == null ||
            datestring == "" ||
            typeof datestring == "undefined"
        ) {
            return null;
        }

        var splitDate = datestring.split("/");
        return new Date(splitDate[2], splitDate[1] - 1, splitDate[0]);
    }

    static CreateDateTimeObject(datestring) {
        if (datestring instanceof Date) {
            return datestring;
        } else if (
            datestring == null ||
            datestring == "" ||
            typeof datestring == "undefined"
        ) {
            return null;
        }

        var splitDate = datestring.split(" ")[0].split("/");
        var splitTime = datestring.split(" ")[1].split(":");
        return new Date(
            splitDate[2],
            splitDate[1] - 1,
            splitDate[0],
            splitTime[0],
            splitTime[1]
        );
    }

    static ToJsonDate(date): any {
        if (date == null || date == "" || typeof date == "undefined") return null;

        var dateObject = this.CreateDateObject(date);

        var timeOffset = dateObject.getTimezoneOffset() / 60;
        var sign;
        if (timeOffset > 0) sign = "-";
        else if (timeOffset < 0) sign = "+";
        else return "/Date(" + dateObject.getTime() + ")/";

        timeOffset = Math.abs(timeOffset);

        var floor = Math.floor(timeOffset);
        var point = timeOffset - floor;

        var front = "";
        if (floor < 10) {
            front = "0" + floor.toString();
        } else {
            front = floor.toString();
        }

        var back = "";
        point = Math.floor(point * 100);
        if (point < 10) back = "0" + point.toString();
        else back = point.toString();

        return "/Date(" + dateObject.getTime() + sign + front + back + ")/";
    }

    // return a parameter value from the current URL
    static GetParam(name, url) {
        if (!url) url = location.href;
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(url);
        return results == null ? "" : results[1];
    }

    static ConvertTagToString(tag) {
        if (typeof tag == "undefined" || tag == null) return null;
        return tag.replace("<", "&lt;").replace(">", "&gt;");
    }

    static ConvertStringToTag(str) {
        if (typeof str == "undefined" || str == null) return null;
        return str.replace("&lt;", "<").replace("&gt;", ">");
    }

    static GetErrorMessageFromResponse(error, isShowErrorTime) {
        var errMsg = null;

        if (typeof error == "string") {
            errMsg = error;
        } else {
            if (error.responseText != null && error.responseText != "") {
                try {
                    var err = JSON.parse(error.responseText);
                    if (err != null && err.Message) {
                        errMsg = err.Message;
                    }
                } catch (err) { }
            }
            if (error.status != 0) errMsg = error.responseText;
            else errMsg = error.statusText;
        }

        if (isShowErrorTime == true) {
            return "[ " + this.GetDateFormat2(new Date()) + " ] : " + errMsg;
        } else {
            return errMsg;
        }
    }

    static AlertErrorMessage(error) {
        var errMsg = this.GetErrorMessageFromResponse(error, true);

        this.AlertModal(errMsg, 1, 2);
    }

    static AlertErrorMessageCustomTitle(title, error) {
        var errMsg = this.GetErrorMessageFromResponse(error, true);

        this.AlertModalCustomTitle(title, errMsg, 1, 2, null);
    }

    static CommonErrorHandler(error) {
        if (error.status == 401) {

            localStorage.setItem("callbackLink", window.location.href);

            var userManager = new UserManager(OidcConfig.Config);
            var ts = Math.round((new Date()).getTime() / 1000);

            var enableManualCheckSession = false;
            if (fs.Config.EnableManualCheckSession)
                enableManualCheckSession = fs.Config.EnableManualCheckSession;
            if (enableManualCheckSession) {

                var expireTime = Number.parseInt(localStorage.getItem("UserExpireTime"));

                //      var userManager = new oidc.UserManager(OidcConfig.Config);
                userManager.clearStaleState().then(() => {
                    console.log('clearState success');
                    if ((expireTime - ts) < 0) {
                        userManager.signinRedirect({ prompt: "login" });
                    } else {
                        userManager.signinRedirect();
                    }
                }).catch((e) => {
                    console.log('clearStateState error', e.message);
                });
            } else {

                userManager.clearStaleState().then(() => {
                    console.log('clearState success');
                    userManager.signinRedirect();
                }).catch((e) => {
                    console.log('clearStateState error', e.message);
                });
            }
            //window.location.href = fs.Config.LoginPageUrl;
            FsUtility.AlertErrorMessage(error);
        } else {
            FsUtility.AlertErrorMessage(error);
        }
    }

    static GetConstructorName(vm) {
        return /function\s+([^\s(]+)\s*\(/.exec(vm.constructor.toString())[1];
    }

    static TemplateSelector(mapping) {
        return (vm) => {
            var constructorName = this.GetConstructorName(vm);
            return mapping[constructorName];
        };
    }

    static FormatMoney(amount, c, d, t) {
        if (amount == null) return null;

        var n = amount,
            c = isNaN((c = Math.abs(c))) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = parseInt((n = Math.abs(+n || 0).toFixed(c))) + "",
            i2 = parseInt(i),
            j = (j = i.length) > 3 ? j % 3 : 0;
        return (
            s +
            (j ? i.substr(0, j) + t : "") +
            i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
            (c
                ? d +
                Math.abs(n - i2)
                    .toFixed(c)
                    .slice(2)
                : "")
        );
    }

    // mode : save = 1, update = 2, delete = 3
    // event: success = 1, error = 2, question = 3, info = 4
    static AlertModalCustomTitle(title, message, mode, event, callback) {
        $("#myModal").remove();
        $(".modal-backdrop").remove();
        // Save / Update
        var OklBtn =
            '<button type="button" class="btn btn-default btn-confirm-popup" id="OK-modal-button" data-bs-dismiss="modal">OK</button>';
        var YeslBtn =
            '<button type="button" class="btn btn-default btn-confirm-popup" data-bs-dismiss="modal" id="Confirm-modal-button">YES</button>';
        var NolBtn =
            '<button type="button" class="btn btn-default btn-cancel-popup" data-bs-dismiss="modal" id="Cancel-modal-button">NO</button>';
        // Delete
        var ConfirmBtn =
            '<button type="button" class="btn btn-default btn-confirm-popup" data-bs-dismiss="modal" id="Confirm-modal-button">OK</button>';
        var CancelBtn =
            '<button type="button" class="btn btn-default btn-cancel-popup" data-bs-dismiss="modal" id="Cancel-modal-button">Cancel</button>';
        var Btns = OklBtn;
        if (mode == "3") {
            Btns = ConfirmBtn + CancelBtn;
        }
        if (mode == 4) Btns = YeslBtn + NolBtn;

        // For GoToinbox
        var GotoInboxBtn =
            '<button type="button" class="btn btn-success" data-bs-dismiss="modal" id="Confirm-modal-button">Go To Inbox</button>';
        var ViewRequestBtn =
            '<button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="Cancel-modal-button">View Request</button>';
        var GotoInboxBtn2 =
            '<button type="button" class="btn btn-success margin-side-5" data-bs-dismiss="modal" id="Confirm-modal-button">Go To Inbox</button>';
        var ViewRequestBtn2 =
            '<button type="button" class="btn btn-danger margin-side-5" data-bs-dismiss="modal" id="Cancel-modal-button">View Request</button>';
        var CreatRequestBtn =
            '<button type="button" class="btn btn-primary2 margin-side-5" data-bs-dismiss="modal" id="One-modal-button">Create Request</button>';
        if (mode == 5) Btns = GotoInboxBtn + ViewRequestBtn;
        if (mode == "6") {
            Btns = GotoInboxBtn2 + ViewRequestBtn2 + CreatRequestBtn;
        }

        var modelTemplate =
            '<div class="modal fade" style=\'z-index:103099\' data-backdrop="static" data-keyboard="false" id="myModal" role="dialog">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">';

        //Header
        if (event != null) {
            var eventClass = "";
            var background = "";
            var backgroundClass = "";

            if (event == "1") {
                title = title == null ? "Success" : title;
                eventClass = "fa fa-check-circle";
                background = "#72c244";
                backgroundClass = "bg-modal-success";
            } else if (event == "2") {
                title = title == null ? "Error" : title;
                eventClass = "fa fa-exclamation-circle";
                background = "#ff4743";
                backgroundClass = "bg-modal-error";
            } else if (event == "3") {
                title = title == null ? "Are you sure?" : title;
                eventClass = "fa fa-question-circle";
                background = "#ffbb34";
                backgroundClass = "bg-modal-question";
            } else if (event == "4") {
                title = title == null ? "Warning!" : title;
                eventClass = "fa fa-warning";
                background = "#ffbb34";
                backgroundClass = "bg-modal-warning";
            }

            modelTemplate +=
                '<div class="modal-header ' +
                backgroundClass +
                '" style="background-color:' +
                background +
                '">' +
                '<h4 class="modal-title fs-modal-popup" style="color: #fff;">' +
                '<i class="' +
                eventClass +
                '"></i>&nbsp;&nbsp' +
                title +
                "</h4></div>";
        }
        //Header

        if (mode == "6") {
            modelTemplate +=
                '<div class="modal-body">' +
                "<p>" +
                message +
                "</p>" +
                "</div>" +
                '<div class="modal-footer">' +
                '<div class="col-sm-12 text-center">' +
                Btns +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>";
            $("body").append(modelTemplate);
        } else {
            modelTemplate +=
                '<div class="modal-body">' +
                "<p>" +
                message +
                "</p>" +
                "</div>" +
                '<div class="modal-footer">' +
                Btns +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>";
            $("body").append(modelTemplate);
        }

        setTimeout(() => {
            $("#myModal").modal("show");
        }, 200);

        $("#OK-modal-button").click(() => {
            if (callback != null) callback(true);
        });

        $("#Confirm-modal-button").click(() => {
            if (callback != null) callback(true);
        });

        $("#Cancel-modal-button").click(() => {
            if (callback != null) callback(false);
        });

        $("#One-modal-button").click(() => {
            if (callback != null) callback("Create Payment");
        });
    }

    static AlertModal(message, mode, event, callback = null) {
        this.AlertModalCustomTitle(null, message, mode, event, callback);
    }

    static ZeroPad(num, length) {
        if (num != undefined && num != null) {
            var s = num + "",
                needed = length - s.length;
            s = num + "";
            if (needed > 0) s = (Math.pow(10, needed) + "").slice(1) + s;

            return s;
        } else return "";
    }

    static IsInt(x) {
        var y = parseInt(x, 10);
        return !isNaN(y) && x == y && x.toString() == y.toString();
    }

    static ParseFloat(number) {
        return parseFloat(parseFloat(number).toPrecision(12));
    }

    static AddMonths(date, months) {
        var result = new Date(date);
        result.setMonth(result.getMonth() + months);
        return result;
    }

    static AddDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    static RoundNumber(number, digits) {
        //var nagative = false;
        //if (number < 0) {
        //    number = number * -1;
        //    nagative = true;
        //}
        //var result = Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits);
        //if (nagative) {
        //    result = result * -1;
        //}
        //Because Nagative Round not equal Positive
        //return result;
        var p = Math.pow(10, digits);
        var m = Number((Math.abs(number) * p).toPrecision(15));
        return (Math.round(m) / p) * Math.sign(number);
    }

    static MonthDiff(d1, d2) {
        var months;

        if (d2 >= d1) {
            months = (d2.getFullYear() - d1.getFullYear()) * 12;
            months -= d1.getMonth();
            months += d2.getMonth();
        } else {
            months = (d1.getFullYear() - d2.getFullYear()) * 12;
            months -= d2.getMonth();
            months += d1.getMonth();
            months = -1 * months;
        }
        return months;
    }

    static GenerateUserDisplay(
        username,
        position,
        company,
        section,
        phoneNo,
        email
    ) {
        return (
            (username == null ? "-" : username) +
            (position == null ? " / -" : (" / " + position)) +
            (company == null ? " / -" : (" / " + company)) +
            "<br/>" +
            (section == null ? "-" : section) +
            (phoneNo == null ? " / -" : (" / " + phoneNo)) +
            (email == null ? " / -" : (" / " + email))
        );
    }

    static GenerateGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            function (c) {
                var r = (Math.random() * 16) | 0,
                    v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            }
        );
    }

    static ValidateEmail(email: string): boolean {
        // Regular expression to match most email addresses
        const emailRegex =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email);
    }

    static ValidateNumber(value: string): boolean {
        const format = /^[0-9]+$/;
        return format.test(value);
    }

    static ValidateOnlyLetterAndNumber(value: string) {
        // Regular expression to match most Letters and Numbers
        const strRegex = /^[a-zA-Z0-9]+$/;
        return strRegex.test(value);
    }

    static ToJsonDateWithoutTimezone(date): any {
        var userTimezoneOffset = date.getTimezoneOffset() * 60000;
        var dateObject = new Date(date.getTime() - userTimezoneOffset);

        return '\/Date(' + dateObject.getTime() + ')\/';
    }
}
