using Fs.Erp.Core;
using System;
using System.Collections.Generic;

namespace WanaD.AppServiceContract
{
    public class BioAcousticData
    {
        public Guid? Id { get; set; }
        public FarmAndPlotData Farm { get; set; }
        public NameAndIdData Plot { get; set; }
        public decimal? Score { get; set; }
        public DateTime? Date { get; set; }
        public string SenserId { get; set; }
        public string SenserCoordinates { get; set; }
        public string Remark { get; set; }
    }
}
