using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WanaD.AppServiceContract
{
    public class FindUserByExternalIdRequest
    {
        public string ExternalId { get; set; }
        public string Provider { get; set; }
    }
}
