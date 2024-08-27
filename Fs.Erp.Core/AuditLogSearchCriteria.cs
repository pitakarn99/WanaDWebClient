using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core
{
    public class AuditLogSearchCriteria
    {
        public Guid? AddedByUserUID { get; set; }
        public DateTimeOffset? DateFrom { get; set; }
        public DateTimeOffset? DateTo { get; set; }
        public string AuditLogCategoryCode { get; set; }
    }
}
