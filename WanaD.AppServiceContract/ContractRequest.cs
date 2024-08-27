using System;

namespace WanaD.AppServiceContract
{
    public class ContractRequest
    {
        public Guid ContractId { get; set; }
        public bool IsAccept { get; set; }
        public bool IsReject { get; set; }
        public string Remark { get; set; }
        public string StatusCode { get; set; }
        
    }
}