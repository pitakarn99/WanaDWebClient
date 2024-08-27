using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Fs.Erp.Core
{
    public class LoginResult
    {
        public LoginResultCode LoginResultCode { get; set; }
        public string Token { get; set; }
    }
}
