using System;

namespace WanaD.AppServiceContract
{
    public class ProductionListSearchCriteria
    {

        public Guid ProductMasterId { get; set; }
        public string OrderNo { get; set; }
        public string ProductionListStatus { get; set; }
    }
}
