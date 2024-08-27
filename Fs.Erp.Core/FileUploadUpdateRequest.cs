using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core
{
    public class FileUploadUpdateRequest
    {
        public string FileName { get; set; }
        public byte[] FileData { get; set; }
    }
}
