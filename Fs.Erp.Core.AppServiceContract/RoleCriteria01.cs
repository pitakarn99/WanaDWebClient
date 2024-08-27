using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class RoleCriteria01
    {
        public string ApplicationCode { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        //public short? Type { get; set; }
        //public bool IsReadOnly { get; set; }
        public bool? IsRole { get; set; }
    }
}
