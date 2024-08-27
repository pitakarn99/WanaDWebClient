using System;
using System.Collections.Generic;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class PDFFileInfoData : FileInfoData
    {
        public IList<PDFPageInfoData> PageInfoDatas { get; set; }
        public string OldFileName { get; set; }
    }
}
