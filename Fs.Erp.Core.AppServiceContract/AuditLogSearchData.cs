using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class AuditLogSearchData
    {
        public Guid Id { get; set; }
        public string AuditLogMessageCode { get; set; }
        public string Message { get; set; }
        public DateTime EventDate { get; set; }
    }
}
