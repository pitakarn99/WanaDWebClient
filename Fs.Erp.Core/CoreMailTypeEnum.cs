using System;
using System.Collections.Generic;
using System.Text;

namespace Fs.Erp.Core
{
    public enum CoreMailTypeEnum : byte
    {
        ForgetPassword = 1,
        CreatePassword = 2,
        Activate = 3,
        ResetPassword = 4
    }
}
