using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Fs.Erp.Core
{
    public class OrganizationUnitCriteria01
    {
        public Guid? Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public Guid? ParentOrganizationUnitId { get; set; }
        public bool? IsRootNode { get; set; }
        public bool? IsActive { get; set; }
    }
}
