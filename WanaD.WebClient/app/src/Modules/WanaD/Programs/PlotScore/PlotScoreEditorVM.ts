/* eslint-disable @typescript-eslint/no-this-alias */

import EditorVMBase from "Lib/Fs.SmartClient.Client/EditorVMBase";
import FsUtility from "Lib/Fs.SmartClient.Client/FsUtility";
import PlotScoreData from "../../Scripts/AppServiceContract/PlotScoreData";
import PlotScoreAppService from "../../Scripts/AppServiceContract/PlotScoreAppService";
import { resolve } from "aurelia";
import { IValidationController } from "@aurelia/validation-html";
import PlotScoreSearchVM from "./PlotScoreSearchVM";
import FarmAndPlotData from "../../Scripts/AppServiceContract/FarmAndPlotData";
import NameAndIdData from "../../Scripts/AppServiceContract/NameAndIdData";
import { fs } from "../../../../Config/FsConfig";

import download from 'downloadjs'

export default class PlotScoreEditorVM extends EditorVMBase {
    Id: string;
    Farm: FarmAndPlotData;
    Plot: NameAndIdData;
    TotalScore: number;
    Date: Date;
    Result: string;
    VerifierName: string;
    VerifierDate: Date;
    StatusCode: string;
    StatusName: string;
    MonsoonStaff: string;
    Remark: string;
    FileInfoList: any;
    WorkflowDocumentId: string;
    ValidationController = resolve(
        IValidationController
    ) as IValidationController;
    
    Parent: PlotScoreSearchVM;
    constructor() {
        super();
    }

    async LoadOriginalSourceAsync(originalSource: PlotScoreData) {
        this.Id = originalSource.Id;
        this.Farm = originalSource.Farm;
        this.Plot = originalSource.Plot;
        this.TotalScore = originalSource.TotalScore;
        this.Date = FsUtility.CreateDateObject(FsUtility.ParseDate(originalSource.Date, 1)
        );       
        this.Result = originalSource.Result;
        this.VerifierName = originalSource.VerifierName;
        this.VerifierDate = FsUtility.CreateDateObject(FsUtility.ParseDate(originalSource.VerifierDate, 1)
        );
        this.StatusCode = originalSource.StatusCode;
        this.StatusName = originalSource.StatusName;
        this.MonsoonStaff = originalSource.MonsoonStaff;
        this.Remark = originalSource.Remark;
        this.FileInfoList = originalSource.FileInfoList;
        this.WorkflowDocumentId = originalSource.WorkflowDocumentId;
    }
    async SaveOriginalSourceAsync(originalSource: PlotScoreData) {
        originalSource.Id = this.Id;
        originalSource.Farm = this.Farm;
        originalSource.Plot = this.Plot;
        originalSource.TotalScore = this.TotalScore;
        originalSource.Date = this.Date;
        originalSource.Result = this.Result;
        originalSource.VerifierName = this.VerifierName;
        originalSource.VerifierDate = this.VerifierDate;
        originalSource.StatusCode = this.StatusCode;
        originalSource.StatusName = this.StatusName;
        originalSource.MonsoonStaff = this.MonsoonStaff;
        originalSource.Remark = this.Remark;
        originalSource.FileInfoList = this.FileInfoList;
        originalSource.WorkflowDocumentId = this.WorkflowDocumentId;
    }

    dowloadfile(item) {



        const map = {
            "3g2": "video/3gpp2",
            "3gp": "video/3gp",

            "7zip": "application/x-compressed",
            "aac": "audio/x-acc",
            "ac3": "audio/ac3",
            "ai": "application/postscript",

            "aif": "audio/aiff",
            "au": "audio/x-au",
            "avi": "video/x-msvideo",

            "bin": "application/macbinary",

            "bmp": "image/bmp",

            "cdr": "application/cdr",

            "cpt": "application/mac-compactpro",
            "crl": "application/pkix-crl",

            "crt": "application/x-x509-ca-cert",

            "css": "text/css",
            "csv": "text/x-comma-separated-values",

            "dcr": "application/x-director",
            "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "dvi": "application/x-dvi",
            "eml": "message/rfc822",
            "exe": "application/x-msdownload",
            "f4v": "video/x-f4v",
            "flac": "audio/x-flac",
            "flv": "video/x-flv",
            "gif": "image/gif",
            "gpg": "application/gpg-keys",
            "gtar": "application/x-gtar",
            "gzip": "application/x-gzip",
            "hqx": "application/mac-binhex40",

            "html": "text/html",
            "ico": "image/x-icon",


            "ics": "text/calendar",
            "jar": "application/java-archive",

            "jp2": "image/jp2",
            "jpg": "image/jpeg",
            "jpeg": "image/jpeg",

            "js": "application/x-javascript",
            "json": "application/json",

            "kml": "application/vnd.google-earth.kml+xml",
            "kmz": "application/vnd.google-earth.kmz",
            "log": "text/x-log",
            "m4a": "audio/x-m4a",

            "m4u": "application/vnd.mpegurl",
            "mid": "audio/midi",
            "mif": "application/vnd.mif",
            "mov": "video/quicktime",
            "movie": "video/x-sgi-movie",
            "mp3": "audio/mpeg",

            "mp4": "video/mp4",
            "mpeg": "video/mpeg",
            "oda": "application/oda",
            "ogg": "audio/ogg",


            "otf": "font/otf",
            "p10": "application/x-pkcs10",

            "p12": "application/x-pkcs12",
            "p7a": "application/x-pkcs7-signature",
            "p7c": "application/pkcs7-mime",

            "p7r": "application/x-pkcs7-certreqresp",
            "p7s": "application/pkcs7-signature",
            "pdf": "application/pdf",

            "pem": "application/x-x509-user-cert",

            "pgp": "application/pgp",
            "php": "application/x-httpd-php",



            "png": "image/png",

            "ppt": "application/powerpoint",

            "doc": "application/msword",
            "pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",

            "psd": "image/vnd.adobe.photoshop",
            "ra": "audio/x-realaudio",
            "ram": "audio/x-pn-realaudio",
            "rar": "application/x-rar",


            "rpm": "audio/x-pn-realaudio-plugin",
            "rsa": "application/x-pkcs7",
            "rtf": "text/rtf",
            "rtx": "text/richtext",
            "rv": "video/vnd.rn-realvideo",
            "sit": "application/x-stuffit",
            "smil": "application/smil",
            "srt": "text/srt",
            "svg": "image/svg+xml",
            "swf": "application/x-shockwave-flash",
            "tar": "application/x-tar",
            "tgz": "application/x-gzip-compressed",
            "tiff": "image/tiff",
            "ttf": "font/ttf",
            "txt": "text/plain",
            "vcf": "text/x-vcard",
            "vlc": "application/videolan",
            "vtt": "text/vtt",

            "wav": "audio/wav",
            "wbxml": "application/wbxml",
            "webm": "video/webm",
            "webp": "image/webp",
            "wma": "audio/x-ms-wma",
            "wmlc": "application/wmlc",
            "wmv": "video/x-ms-wmv",

            "woff": "font/woff",
            "woff2": "font/woff2",
            "xhtml": "application/xhtml+xml",
            "xl": "application/excel",

            "xls": "application/xls",

            "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

            "xml": "application/xml",

            "xsl": "text/xsl",
            "xspf": "application/xspf+xml",
            "z": "application/x-compress",

            "zip": "application/zip",

            "zsh": "text/x-scriptzsh",
        };
        const download_url = fs.Config.ServiceBaseUrl + 'modules/WanaD.AppService/UploadFileAppService/DownloadFile?id=' + item.Id;

        const x = new XMLHttpRequest();
        x.open("POST", download_url, true);
        const user = this.container.get("user");
        if (user != null) {
            x.setRequestHeader('Authorization', 'Bearer ' + user['access_token']);
        }

        x.responseType = 'blob';

        x.onload = function (e) {

            const file = new Blob([x.response], { type: map[item.Extension.substring(1)] });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);

            download(x.response, item.FileName, map[item.Extension.substring(1)]);
        }

        x.send();
    }

    
}
