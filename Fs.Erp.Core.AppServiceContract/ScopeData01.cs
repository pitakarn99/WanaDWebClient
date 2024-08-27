using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class ScopeData01
    {
        public Int64 Id { get; set; }
        public string ApplicationCode { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }

        public IList<Scope_Role_GroupData01> Scope_Role_Groups { get; set; }
    }
}
