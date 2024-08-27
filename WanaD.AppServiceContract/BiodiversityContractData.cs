using System;

namespace WanaD.AppServiceContract
{
    public class BiodiversityContractData
    {
        public Guid? Id { get; set; }
        public string ContractNo { get; set; }
        public string FarmName { get; set; }
        public string OwnerName { get; set; }
        public Guid? FarmId { get; set; }
        public string PlotName { get; set; }
        public Guid? PlotId { get; set; }
        public decimal? Area { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal? Amount { get; set; }
        public decimal? Factor { get; set; }
        public decimal? MinimumScore { get; set; }
        public decimal? PlotScore { get; set; }
        public string PaymentRequestNo { get; set; }
        public Guid? PaymentRequestId { get; set; }
        public string StatusName { get; set; }
        public string StatusCode { get; set; }
        public Guid? WorkflowDocumentId { get; set; }

    }
}
