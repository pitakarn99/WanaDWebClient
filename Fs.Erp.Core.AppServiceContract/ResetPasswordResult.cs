using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public enum ResetPasswordResultCode
    {
        Success = 1,
        Invalid = 2
    };

    public class ResetPasswordResult
    {
        public ResetPasswordResultCode ResetPasswordResultCode { get; set; }
    }
}
