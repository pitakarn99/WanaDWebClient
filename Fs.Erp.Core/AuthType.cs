using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core
{
    public enum AuthType
    {
        [Description("Form")]
        MyAccount = 0,
        [Description("LDAP")]
        Ldap = 1,
        [Description("Oauth")]
        Oauth = 2
    };
}
