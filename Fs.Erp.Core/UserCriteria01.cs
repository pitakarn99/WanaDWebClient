using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core
{
   public class UserCriteria01
    {
        public string Login { get; set; }
        public string LoginLike { get; set; }
        public Guid UserUID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string EmailLike { get; set; }
        public bool? IsGroup { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsLocked { get; set; }
        public bool? IsRole { get; set; }
        public string Realm { get; set; }
        public string AutoCompleteText { get; set; }

        public DateTime PasswordExpireDate { get; set; }
    }
}
