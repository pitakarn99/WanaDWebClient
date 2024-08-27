using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core.AppServiceContract
{
    public class UserSendDataUpdateRequest
    {
        public Guid UserUID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
