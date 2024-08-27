using System;
using System.Collections.Generic;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class ConfigurationRequest
    {
        public string ConfigurationItemCode { get; set; }
        public string ConfigurationItemValue { get; set; }
        public string ConfigurationItemName { get; set; }
    }
}
