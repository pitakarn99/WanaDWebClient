using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core
{
    public class ACLTemplateItemsData
    {
        public List<Guid?> ResourceUID { get; set; }
        public Guid ACLTemplateId { get; set; }
    }
}
