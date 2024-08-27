using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class MemberData01
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public Guid UserUID { get; set; }
        public Guid GroupUID { get; set; }
        public bool IsGroup { get; set; }
    }
}
