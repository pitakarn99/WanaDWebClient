

using System;

namespace WanaD.AppServiceContract
{
    public class DeliveryRequest
    {

        public Guid ProductId { get; set; }
        public DateTime DeliveredDate { get; set; }
        public decimal? Quantity { get; set; }
        public bool IsAccept { get; set; }
        public string Remark { get; set; }
        public Guid? FactoryId { get; set; }
    }
}
