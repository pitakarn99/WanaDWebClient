using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class AuditLogMessageData01
    {
        public string Code { get; set; }
        public int? LevelNumber { get; set; }
        public string Template { get; set; }
        public string AuditLogCategoryCode { get; set; }
    }
}
