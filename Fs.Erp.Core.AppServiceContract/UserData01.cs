using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class UserData01
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public bool IsGroup { get; set; }
        public bool? IsActive { get; set; }
        public bool IsLocked { get; set; }
        public Guid UserUID { get; set; }
        public string Realm { get; set; }
        public DateTime PasswordExpireDate { get; set; }
        public AuthType? AuthType { get; set; }
        public string Provider { get; set; }
        public String ExternalUserId { get; set; }
        public bool IsRequirePassword { get; set; }
    }
}
