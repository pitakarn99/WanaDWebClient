using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core
{
    public class ACLTemplateUpdateParameter
    {
        public Guid UserUID { get; set; }
        public List<ACLTemplateItemsData> Items { get; set; }

        public ACLTemplateUpdateParameter()
        {
            Items = new List<ACLTemplateItemsData>();
        }
    }
}

