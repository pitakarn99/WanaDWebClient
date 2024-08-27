using System;
using System.Collections.Generic;

namespace WanaD.AppServiceContract
{
    public class BioAcousticScoreData
    {
        public Guid Id { get; set; }
        public string DeviceName { get; set; }
        public string PlotName { get; set; }
        public DateTime? Date { get; set; }
        public string Remark { get; set; }
        public decimal? Score { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public List<BioAcousticSpeciesData> BioAcousticSpeciesDatas { get; set; }
    }
}
