using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core
{
    public class AttachmentData
    {
        public Guid Id { get; set; }
        public string AttachmentFile { get; set; }
        public string Description { get; set; }
        public DateTimeOffset? AttachmentDate { get; set; }
        public DateTimeOffset? CreatedDate { get; set; }
        public string Attachmenter { get; set; }

    }
}
