using System;

namespace WanaD.AppServiceContract
{
    public class DeviceTokenData
    {
        public Guid? Id { get; set; }
        public Guid? UserUID { get; set; }
        public string Token { get; set; }
        public DateTime? LoginDate { get; set; }
    }
}
