using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Fs.Erp.Core
{
    public enum LoginResultCode
    {
        Success = 1,
        Invalid = 2,
        PasswordExpire = 3,
        RequiredOU = 4,
        NotActivated = 5,
        Locked = 6
    };
}
