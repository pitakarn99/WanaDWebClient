using System;
using System.Collections.Generic;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class SendActivateEmailData
    {
        public bool IsCreatePassword { get; set; }
        public Guid UserId { get; set; }
    }
}
