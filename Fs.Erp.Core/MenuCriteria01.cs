using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Fs.Erp.Core
{
    public class MenuCriteria01
    {
        public string Code { get; set; }
        public string ParentCode { get; set; }
        //public string ReferenceId { get; set; }
        public bool? IsRootNode { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsHidden { get; set; }
    }
}
