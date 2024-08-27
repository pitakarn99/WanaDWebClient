using Fs.Erp.Core;
using System;
using System.Collections.Generic;

namespace WanaD.AppServiceContract
{
    public class FarmAndPlotData
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string OwnerName { get; set; }
        public List<NameAndIdData> Plots { get; set; }
    }
}
