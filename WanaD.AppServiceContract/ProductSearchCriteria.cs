using System;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace WanaD.AppServiceContract
{
    public class ProductSearchCriteria
    {
        public string TeaProductNo { get; set; }
        public string Status { get; set; }
        public Guid? TypeofteaId { get; set; }
        public Guid? FarmId { get; set; }
        public Guid? FactoryId { get; set; }
        public DateTime? RecordDateFrom { get; set; }
        public DateTime? RecordDateTo { get; set; }
        public DateTime? DeliveryDateFrom { get; set; }
        public DateTime? DeliveryDateTo { get; set; }
    }
}
