using System;
using System.Collections.Generic;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class FileInfoData
    {
        public Guid? Id { get; set; } 
        public string FileName { get; set; }
        public int FileSize { get; set; }
        public Guid? RelationId { get; set; }
        public string Extension { get; set; }
        public string FilePath { get; set; }
        public byte[] FileByteData { get; set; }
        public FileXMLData FileXmlData { get; set; }
		public FileInfoTypeEnum? Type { get; set; }
		public Guid? ExternalId { get; set; }
	}
}
