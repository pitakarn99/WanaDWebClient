using System;
using System.Collections.Generic;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class PDFPageInfoData
    {
        public Guid FileInfoId { get; set; }
        public byte[] FileInfoData { get; set; }
        public string FileName { get; set; }
        public Guid CurrentFileInfoId { get; set; }
        public int PageNo { get; set; }
        public int CurrentPageNo { get; set; }
        public int Rotation { get; set; }
        public PDFOperation Operation { get; set; }
    }
}
