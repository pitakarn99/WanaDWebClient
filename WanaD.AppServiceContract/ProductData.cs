

using Fs.Erp.Core;
using System;
using System.Collections.Generic;

namespace WanaD.AppServiceContract
{
    public class ProductData
    {
        public Guid? Id { get; set; }
        public string QrId { get; set; }
        public string Code { get; set; }
        public DateTime? RecordDate { get; set; }
        public string Plot { get; set; }
        public Guid? PlotId { get;  set; }
        public string TypeofTea { get; set; }
        public Guid? TeaTypeId { get;  set; }
        public DateTime? DeliveredDate { get; set; }
        public decimal? DeliveredWeight { get; set; }
        public string StatusCode { get; set; }
        public string StatusName { get; set; }
        public string Unit { get; set; }
        public Guid? WorkflowDocumentId { get; set; }
        public Guid? OrderId { get;  set; }
        public string Note { get; set; }
        public List<FileInfoData> FileInfoList { get; set; }

        //fordelivery
        public string Farm  { get; set; }
        public Guid? FarmId { get; set; }
        public string FarmOwner { get; set; }
        public decimal? Quantity { get; set; }
        public DateTime? ProductionDate { get;  set; }

        //for production
        public string ProductLotNo { get; set; }
        public string FactoryName { get; set; }
        public string ProductMasterName { get; set; }
        public string ProductTypeCode { get; set; }




    }
}
