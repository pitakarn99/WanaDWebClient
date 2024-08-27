using System;
using System.Collections.Generic;

namespace WanaD.AppServiceContract
{
    public class BiodiversityContractFarmData
    {
        public string FarmName { get; set; }
        public string OwnerName { get; set; }
        public Guid FarmId { get; set; }
        public List<BiodiversityContractPlotData> PlotDatas { get; set; }

    }
}
