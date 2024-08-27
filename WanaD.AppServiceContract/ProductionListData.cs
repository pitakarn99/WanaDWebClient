

using Fs.Erp.Core;
using System;
using System.Collections.Generic;

namespace WanaD.AppServiceContract
{
    public class ProductionListData
    {
        public Guid Id { get;  set; }
        public Guid OrderId { get;  set; }
        public DateTime? ProductionDate { get;  set; }
        public decimal? Quantity { get; set; }
        public string ProductLotNo { get;  set; }
        public string Note { get;  set; }
        public string ProductTypeName { get;  set; }
        public string ProductMasterName { get;  set; }
        public string ProductMasterNo { get;  set; }
        public string OrderNo { get;  set; }
        public string Unit { get;  set; }
        public string Status { get;  set; }
        public string StatusCode { get; set; }
        public string StatusName { get; set; }
        public Guid? WorkflowDocumentId { get; set; }
    }
}
