using Fs.Erp.Core;
using System;
using System.Collections.Generic;

namespace WanaD.AppServiceContract
{
    public class VisitPlotCollectionData
    {
        public Guid? Id { get; set; }
        public FarmAndPlotData Farm { get; set; }
        public NameAndIdData Plot { get; set; }
        public decimal? Score { get; set; }
        public DateTime? VisitedDate { get; set; }
        public string TestResult { get; set; }
        public decimal? BiomassPerRai { get; set; }
        public string BiomassDetails { get; set; }
        public string MonsoonStaff { get; set; }
        public string Remark { get; set; }
        public bool IsSummarized { get; set; }
        public List<FileInfoData> FileInfoList { get; set; }
    }
}
