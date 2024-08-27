using System;
using System.Collections.Generic;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class ActivateData
    {
        public string TokenKey { get; set; }
        public Guid UserId { get; set; }
    }
}
