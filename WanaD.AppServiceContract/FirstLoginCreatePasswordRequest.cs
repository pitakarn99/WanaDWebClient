using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WanaD.AppServiceContract
{
    public class FirstLoginCreatePasswordRequest
    {
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
