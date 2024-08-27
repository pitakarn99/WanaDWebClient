using System;
using System.Collections.Generic;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class CreatePasswordData
    {
        public string TokenKey { get; set; }
        public Guid UserId { get; set; }
        public string Password { get; set; }
    }
}
