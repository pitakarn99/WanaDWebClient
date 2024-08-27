using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core
{
    public class AttachmentRequest
    {
        public Guid Id { get; set; }
        public string Document { get; set; }
        public string Description { get; set; }
        public DateTimeOffset? AttachmentDate { get; set; }
        public string Attachmenter { get; set; }
    }
}
