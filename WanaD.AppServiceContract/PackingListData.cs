using System;

namespace WanaD.AppServiceContract
{
    public class PackingListData
    {
        public Guid ProductId { get; set; }
        public string PackingNo { get; set; }
        public string ProductMasterName { get; set; }
        public string ProductMasterNo { get; set; }
        public DateTime? PackingDate { get; set; }
        public decimal Quantity { get; set; }
        public string PackingSize { get; set; }
        public string PackingType { get; set; }
    }
}