using System;

namespace WanaD.AppServiceContract
{
    public class DeviceSearchCriteria
    {
        public Guid? DeviceId { get; set; }
        public Guid? FarmId { get; set; }
        public string DeviceNo { get; set; }
    }
}
