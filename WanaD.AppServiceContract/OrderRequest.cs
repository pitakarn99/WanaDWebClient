using System;

namespace WanaD.AppServiceContract
{
    public class OrderRequest
    {
        public Guid OrderId { get; set; }
        public bool IsAccept { get; set; }
        public string Remark { get; set; }
        public string StatusCode { get; set; }
        public bool IsReSubmit { get; set; }
    }
}