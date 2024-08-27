using System;
using System.Collections.Generic;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class FileXMLData
    {
        public bool HasXml { get; set; }
        public string DocumentType { get; set; }
        public string DocumentNo { get; set; }
        public DateTimeOffset DocumentDate { get; set; }
        public decimal Amount { get; set; }
        public string MatchDocumentType { get; set; }
    }
}
