using System;
using System.Collections.Generic;

namespace WanaD.AppServiceContract
{
    public class PackingData
    {
        public Guid ProductId { get; set; }
        public string PackingNo { get; set; }
        public string ProductMasterName { get; set; }
        public string ProductMasterNo { get; set; }
        public decimal ProductMasterQty { get; set; }
        public DateTime? ProductionDate {  get; set; }
        public string Unit {  get; set; }
        public string QRId { get; set; }
        public string Note { get; set; }
        public string PackagingSize { get; set; }
        public string PackagingType { get; set; }
        public decimal? Quantity { get; set; }
        public List<ProductMemberData> ProductMemberDatas { get; set; }

    }
}
