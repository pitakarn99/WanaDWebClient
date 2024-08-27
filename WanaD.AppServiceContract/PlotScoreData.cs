using Fs.Erp.Core;
using System;
using System.Collections.Generic;

namespace WanaD.AppServiceContract
{
    public class PlotScoreData
    {
        public Guid? Id { get; set; }
        public FarmAndPlotData Farm { get; set; }
        public NameAndIdData Plot { get; set; }
        public decimal? TotalScore { get; set; }
        public DateTime? Date { get; set; }
        public string Result { get; set; }
        public string VerifierName { get; set; }
        public DateTime? VerifierDate { get; set; }
        public string StatusCode { get; set; }
        public string StatusName { get; set; }
        public string MonsoonStaff { get; set; }
        public string Remark { get; set; }
        public List<FileInfoData> FileInfoList { get; set; }
        public Guid? WorkflowDocumentId { get; set; }
    }
}
