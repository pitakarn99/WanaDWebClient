using System;
using System.Collections.Generic;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class LoginTypeData
    {
        public Guid Id { get; set; }
        public AuthType AuthType { get; set; }
        public string Name { get; set; }
        public bool IsRequirePassword { get; set; }
    }
}
