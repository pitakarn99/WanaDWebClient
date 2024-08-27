using System;
using System.Collections.Generic;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class ActivateTokenRequest
    {
        public bool IsChangePassword { get; set; }
        public string TokenKey { get; set; }
        public Guid ResourceUID { get; set; }
    }
}
