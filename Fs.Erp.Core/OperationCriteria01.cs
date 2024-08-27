using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Fs.Erp.Core
{
    public class OperationCriteria01
    {
        public string ApplicationCode { get; set; }
        public string RoleCode { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public bool? IsRole { get; set; }
        public Guid? RoleUID { get; set; }

        public string NotIsRoleCode { get; set; }
    }
}
