using System;

namespace WanaD.AppServiceContract
{
    public class DeviceData
    {
        public Guid Id { get; set; }
        public Guid PlotId { get; set; }
        public string PlotName { get; set; }
        public string DeviceNo { get; set; }
        public string Api { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
    }
}
