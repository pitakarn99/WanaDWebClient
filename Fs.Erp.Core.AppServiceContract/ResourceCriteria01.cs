using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class ResourceCriteria01
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public Guid? ParentUID { get; set; }
        public string ApplicationCode { get; set; }
    }
}
