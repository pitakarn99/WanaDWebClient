using System;
using System.Collections.Generic;

namespace WanaD.AppServiceContract
{
    public class ProductionCreateData
    {
        public Guid Id { get; set; }
        public Guid QrId { get; set; }
        public Guid OrderId { get; set; }        
        public List<Guid> ProcessingList { get; set; }
        public List<ProductData> ListScanProduct { get; set; }
        public string OrderStatus { get; set; }
        public string Note { get; set; }
        public string Code { get; set; }
        public decimal Quantity { get; set; }        
        public DateTime ProductionDate { get; set; }
        public string Unit { get; set; }
        
        
    }
}
