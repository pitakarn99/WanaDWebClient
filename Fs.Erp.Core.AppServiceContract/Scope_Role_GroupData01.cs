using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class Scope_Role_GroupData01
    {
        public Int64 ScopeId { get; set; }
        public string RoleCode { get; set; }
        public string GroupCode { get; set; }

        public string RoleName { get; set; }
        public string GroupName { get; set; }
        public bool? IsGroup { get; set; }
    }
}
