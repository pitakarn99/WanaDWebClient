using System;

namespace WanaD.AppServiceContract
{
    public class ContractDetailData
    {
        public Guid Id { get; set; }
        public string ContractNo { get; set; }
        public string PlotName { get; set; }
        public decimal Price { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string StatusCode { get; set; }
        public string StatusName { get; set; }
        public Guid? WorkflowDocumentId { get; set; }
    }
}
