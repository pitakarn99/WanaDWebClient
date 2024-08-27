using Fs.Erp.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core.AppServiceContract
{
    public class UserCheckExternalRequest
    {
        public string ExternalId { get; set; }
        public string Provider { get; set; }
    }
}
