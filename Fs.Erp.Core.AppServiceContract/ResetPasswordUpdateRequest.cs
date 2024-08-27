using System;
using System.Collections.Generic;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class ResetPasswordUpdateRequest
    {
        public string TokenKey { get; set; }
        public Guid UserUID { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
