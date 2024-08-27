

using System;

namespace WanaD.AppServiceContract
{
    public class ExportCodeRequest
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
        public bool AllActive { get; set; }
 
    }
}
