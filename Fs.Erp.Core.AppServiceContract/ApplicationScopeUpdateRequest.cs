using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class ApplicationScopeUpdateRequest
    {
        public string ApplicationCode { get; set; }
        public string ScopeName { get; set; }
        public string Type { get; set; }
    }
}
