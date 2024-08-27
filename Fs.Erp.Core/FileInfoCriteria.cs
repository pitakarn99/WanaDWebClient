using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core
{
    public class FileInfoCriteria
    {
        public Guid? Id { get; set; }
        public Guid? RelationId { get; set; }
        public int? RelationTypeValue { get; set; }
        public int? StartRelationTypeValue { get; set; }
        public int? EndRelationTypeValue { get; set; }
        public string FileName { get; set; }
    }
}
