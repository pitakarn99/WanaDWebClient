using System;

namespace WanaD.AppServiceContract
{
    public class PlotDeviceData
    {
        public Guid Id { get; set; }
        public Guid FarmId { get; set; }
        public Guid PlotId { get; set; }
        public string PlotName { get; set; }
        public Guid DeviceId { get; set; }
        public string SensorId { get; set; }
        public string SensorCoordinate { get; set; }
        public PlotData PlotData { get; set; }

    }
}
