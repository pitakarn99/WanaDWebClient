using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core
{
    public class ACLCriteria
    {
        public Int64? Id { get; set; }
        public string ApplicationCode { get; set; }
        public Guid? ResourceId { get; set; }
        public Guid? OperationId { get; set; }
        public string OperationCode { get; set; }
        public string UserCode { get; set; }
        public Guid? UserUID { get; set; }
        public string RelationCode { get; set; }
        public bool IsNullResuourceUID { get; set; }
    }
}
