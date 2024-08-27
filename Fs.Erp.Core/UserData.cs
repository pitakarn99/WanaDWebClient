using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core
{
    public class UserData
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public bool IsGroup { get; set; }
        public bool? IsActive { get; set; }
        public Guid? UserUID { get; set; }
        public string Realm { get; set; }
        public DateTime PasswordExpireDate { get; set; }
        public AuthType? AuthType { get; set; }
    }
}
