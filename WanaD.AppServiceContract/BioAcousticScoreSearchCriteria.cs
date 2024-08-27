using System;
using System.Collections.Generic;

namespace WanaD.AppServiceContract
{
    public class BioAcousticScoreSearchCriteria
    {
        public Guid? DeviceId { get; set; }
        public DateTime? Date { get; set; }
        public List<BioAcousticSpeciesData> bioAcousticSpeciesDatas { get; set; }

    }
}
