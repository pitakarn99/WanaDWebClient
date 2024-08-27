using System;

namespace WanaD.AppServiceContract
{
    public class ContractData
    {
        public Guid Id { get; set; }
        public string ContractNo { get; set; }        
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string StatusCode { get; set; }
        public string StatusName { get; set; }
        public Guid? WorkflowDocumentId { get; set; }
    }
}
