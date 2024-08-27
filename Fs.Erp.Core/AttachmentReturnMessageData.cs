using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core
{
    public class AttachmentReturnMessageData
    {
        public string ErrorMsg { get; set; }
        public string SuccessMsg { get; set; }
        public bool IsSuccess { get; set; }
        public List<string> FileNameList { get; set; }
    }
}
