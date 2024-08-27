using System;

namespace WanaD.AppServiceContract
{
    public class QRData
    {
        public Guid Id { get;  set; }
        public Guid QrEntityId { get;  set; }
        public Guid? ProductId { get;  set; }
        public string RunningNo { get;  set; }
        public string ProductName { get;  set; }
        public DateTime? Date { get; set; }
    }
}
