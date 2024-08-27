using System;

namespace WanaD.AppServiceContract
{
    public class PlotSearchCriteria
    {
        public Guid? PlotId { get; set; }
        public Guid FarmId { get; set; }
        public string Name { get; set; }
    }
}
