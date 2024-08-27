

using System;
using System.Collections.Generic;

namespace WanaD.AppServiceContract
{
    public class OrderData
    {
        public Guid Id { get; set; }
        public Guid FactoryId { get; set; }
        public Guid ProductTypeId { get; set; }
        public Guid ProductMasterId { get; set; }
        public DateTime? DeliveredDate { get; set; }
        public DateTime? FinishedDate { get; set; }
        public decimal Price { get; set; }
        public decimal UnitPrice { get; set; }
        public string OrderStatus { get; set; }
        public string Remark { get; set; }
        public string OrderNo { get; set; }
        public int Quantity { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime RequestDate { get; set; }
        public string ProductName { get; set; }
        public string ProductTypeName { get; set; }
        public string FactoryName { get; set; }
        public decimal Received { get; set; }
        public decimal Percent { get; set; }
        public ProductMasterData ProductMasterData { get; set; }
        public FactoryData FactoryData { get; set; }
        public string Unit { get; set; }
        public string ProductMasterNo { get; set; }
        public string StatusCode { get; set; }
        public string StatusName { get; set; }
        public Guid? WorkflowDocumentId { get; set; }
        public decimal? PaidAmount { get; set; }
        public bool IsReSubmit { get; set; }
        public string ProductTypeCode {  get; set; }

    }
}
