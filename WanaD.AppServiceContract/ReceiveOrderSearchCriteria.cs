using System;

namespace WanaD.AppServiceContract
{
    public class ReceiveOrderSearchCriteria
    {
        public Guid? FactoryId { get; set; }
        public Guid? ProductTypeId { get; set; }
        public Guid? ProductMasterId { get; set; }
        public DateTime? ReceiveDateFrom { get; set; }
        public DateTime? ReceiveDateTo { get; set; }

    }
}
