using System;
using System.Collections.Generic;

namespace WanaD.AppServiceContract
{
    public class ProductionData
    {
        public Guid Id { get;  set; }
        public string QRId { get;  set; }
        public Guid? OrderId { get;  set; }
        public DateTime? ProductionDate { get;  set; }
        public decimal? Quantity { get; set; }
        public string ProductLotNo { get;  set; }
        public string Note { get;  set; }
        public string ProductTypeName { get;  set; }
        public string ProductMasterName { get;  set; }
        public string ProductMasterNo { get;  set; }
        public string OrderNo { get;  set; }
        public string Unit { get;  set; }
        public string Status { get;  set; }
        public ProductMasterData ProductMasterData { get; set; }
        public List<ProductProcessingData> ProductProcessingDatas { get; set; }
        public ProductMasterProcessingData ProductMasterProcessingData { get; set; }
        public List<ProductMemberData> ProductMemberDatas { get; set; }
        public string ProductTypeCode { get; set; }
    }
}
