using System;

namespace WanaD.AppServiceContract
{
    public class ScanQRCriteria
    {
        public Guid QRId { get; set; }        
        public string ProductTypeCode { get; set; }
    }
}
