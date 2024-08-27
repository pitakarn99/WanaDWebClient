using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core
{
    public class AttachmentDataDownload
    {
        public Guid Id { get; set; }
        public string FilenName { get; set; }
        public string FileType { get; set; }
        public byte[] Data { get; set; }
        public string FileNameOnly
        {
            get { return SpliteFileType(FilenName); }
        }

        private string SpliteFileType(string txt)
        {
            if (string.IsNullOrEmpty(txt)) return string.Empty;

            var result = txt.Split('.');

            return result[0];
        }
    }
}
