using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Fs.Erp.Core
{
    public class UserLoginResult
    {
        public LoginResultCode LoginResultCode { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}
