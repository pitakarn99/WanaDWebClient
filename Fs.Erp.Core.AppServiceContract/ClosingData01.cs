using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class ClosingData01
    {
        public DateTime? LastClosingDate { get; set; }
        public DateTime? UpdateLastClosingDate { get; set; }
        public DateTime? LastProcessDate { get; set; }
        public string UpdateLastClosingBy { get; set; }
    }
}
