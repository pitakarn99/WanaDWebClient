using System;
using System.Collections.Generic;

namespace WanaD.AppServiceContract
{
    public class PackingCreateData
    {
        public Guid Id { get; set; }
        public Guid QrId { get; set; }
        public Guid ProductMasterId { get; set; }      
        public List<Guid> ProcessingList { get; set; }
        public List<ProductData> ListScanProduct { get; set; }
        public string Note { get; set; }
        public string Code { get; set; }
        public decimal Quantity { get; set; }        
        public DateTime PackingDate { get; set; }
        public string Unit { get; set; }
        
        
    }
}
