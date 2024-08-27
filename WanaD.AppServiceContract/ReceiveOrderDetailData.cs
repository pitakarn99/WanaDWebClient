using System;
using System.Collections.Generic;

namespace WanaD.AppServiceContract
{
    public class ReceiveOrderDetailData
    {
        public Guid ProductId { get; set; }
        public string ProductLotNo { get; set; }
        public string OrderNo { get; set; }
        public string FactoryName { get; set; }
        public string ProductTypeName { get; set; }
        public string ProductMasterName { get; set; }
        public string ProductMasterNo { get; set; }
        public DateTime? ReceiveDate {  get; set; }
        public decimal ReceiveQty { get; set; }
        public string Unit {  get; set; }
        public decimal? Quantity { get; set; }
        public List<ProductProcessingData> ProcessingDatas { get; set; }
        public string Comment { get; set; }
        public bool IsScaned { get; set; }

    }
}
