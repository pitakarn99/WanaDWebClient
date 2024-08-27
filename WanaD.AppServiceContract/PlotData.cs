

using System;

namespace WanaD.AppServiceContract
{
    public class PlotData
    {
        public Guid Id { get; set; }
        public Guid FarmId { get; set; }
        public string Name { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public Guid BankId { get; set; }
        public string BankAccNumber { get; set; }
        public string BankAccHolder { get; set; }
        public decimal Area { get; set; }
        public string LandOwner { get; set; }
    }
}
