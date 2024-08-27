using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Fs.Erp.Core
{
    public class AuditLogCriteria01
    {
        public string CategoryCode { get; set; }
        public string AuditLogMessageCode { get; set; }
        public string Message { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
