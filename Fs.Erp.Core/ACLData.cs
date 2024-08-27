using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core
{
    public class ACLData
    {
        public Int64 Id { get; set; }
        public string ApplicationCode { get; set; }
        public string ApplicationName { get; set; }
        public Guid? ResourceId { get; set; }
        public string RelationCode { get; set; }

        public string OperationName { get; set; }
        public Guid OperationUID { get; set; }
        public string UserName { get; set; }
        public Guid? UserUID { get; set; }
        public string UserCode { get; set; }
        public string RelationName { get; set; }
        public bool? IsGroup { get; set; }
        public string ResourceName { get; set; }
        public string StateCode { get; set; }
        public string StateName { get; set; }
    }
}
