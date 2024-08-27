using System;
using System.Collections.Generic;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class OuConfigurationData
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public Guid OuId { get; set; }
        public string Description { get; set; }
        public string Value { get; set; }
        public string CategoryCode { get; set; }
        public bool IsAccessWrite { get; set; }
    }
}
