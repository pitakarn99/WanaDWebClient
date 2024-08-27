using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core
{
    public class ACLTemplateDetailData
    {
        
        public string ApplicationCode { get; set; }
        public Guid OperationUID { get; set; }
        public string RelationCode { get; set; }
        public Guid? ResourceUID { get; set; }
        public Guid PrincipalUID { get; set; }
        public string Realm { get; set; }
        public string StateCode { get; set; }
        public Guid? RefId { get; set; }
    }
}
