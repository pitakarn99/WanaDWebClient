using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core
{
    public class ACLTemplateData
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Ordinal { get; set; }
        public bool IsCheck { get; set; }
        public List<Guid?> ResourceUID { get; set; }
        public string ResourceType { get; set; } // มีการใช้งานใน ebill อย่าลบ!!
        public bool IsRequireResourceType { get; set; }
    }
}
