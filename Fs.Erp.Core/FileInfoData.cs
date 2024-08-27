using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core
{
    public class FileInfoData
    {
        public Guid Id { get; set; }
        public string FileName { get; set; }
        public Guid? RelationId { get; set; }
        public int? RelationTypeValue { get; set; }
        public Guid ExtensionId { get; set; }
        public string Extension { get; set; }
        public string MimeType { get; set; }
        public string Description { get; set; }
        public string FilePath { get; set; }
        public byte[] FileByteData { get; set; }
        public int? Ordinal { get; set; }
        public FileInfoTypeEnum? Type { get; set; }
        public Guid? ExternalId { get; set; }
    }
}
