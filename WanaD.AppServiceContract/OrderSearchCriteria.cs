using System;

namespace WanaD.AppServiceContract
{
    public class OrderSearchCriteria
    {
        public Guid? FactoryId { get; set; }
        public string OrderStatus { get; set; }
        public DateTime? RequestDateFrom { get; set; }
        public DateTime? RequestDateTo { get; set; }
        public DateTime? DueDateFrom { get; set; }
        public DateTime? DueDateTo { get; set; }
        public Guid? ProductMasterId { get; set; }
        public Guid? ProductTypeId { get; set; }
        
    }
}
