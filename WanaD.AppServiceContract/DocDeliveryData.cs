using System;
namespace WanaD.AppServiceContract
{
    public class DocDeliveryData
    {
        public Guid? WfDocId { get; set; }
        public DateTime? EventDate { get; set; }
        public string EventName { get; set; }
        public string Channel { get; set; }
        public string UserName { get; set; }
        public string RejectNote { get; set; }
        public string RejectReason { get; set; }
        public string RejectRemark { get; set; }
        public string Action { get; set; }
        public string ProductLotNo { get; set; }

    }
}
