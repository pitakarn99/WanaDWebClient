using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core
{
    public class ACLTemplateCategoryData
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Ordinal { get; set; }
        public List<ACLTemplateData> ACLTemplateDatas { get; set; }
    }
}
