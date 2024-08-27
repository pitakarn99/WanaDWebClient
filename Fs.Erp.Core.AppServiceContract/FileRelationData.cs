using System;
using System.Collections.Generic;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class FileRelationData
    {
        public FileRelationData()
        {
            FileInfoData = new FileInfoData();
        }
        public Guid? Id { get; set; }
        public Guid? ReferenceId { get; set; }
        public Guid FileInfoId { get; set; }
        public int RelationType { get; set; }
        public Guid? CreatorUserProfileId { get; set; }
        public FileInfoData FileInfoData { get; set; }
        public bool IsUploadByBU { get; set; }
        public bool IsUploadByReviewer { get; set; }
        public int? Ordinal { get; set; }
    }
}
