using System;

namespace WanaD.AppServiceContract
{
    public class ReceiveOrderData
    {
        public Guid ProductId { get; set; }
        public string ProductLotNo { get; set; }
        public string OrderNo { get; set; }
        public string FactoryName { get; set; }
        public string ProductTypeName { get; set; }
        public string ProductMasterName { get; set; }
        public DateTime? ReceiveDate {  get; set; }
        public DateTime? ProductionDate {  get; set; }
        public decimal? ReceiveQty { get; set; }
        public string Unit {  get; set; }
        public string StatusCode {  get; set; }
        public string StatusName {  get; set; }
        public Guid? WorkflowDocumentId {  get; set; }

    }
}
