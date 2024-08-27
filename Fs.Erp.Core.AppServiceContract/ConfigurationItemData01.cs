using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class ConfigurationItemData01
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ConfigurationCatCode { get; set; }
        public string ConfigurationCatName { get; set; }
        public string Value { get; set; }
        public Int16 Type { get; set; }
        public DateTimeOffset? UpdDate { get; set; }
    }
}
