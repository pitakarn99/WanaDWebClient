using System;

namespace WanaD.AppServiceContract
{
    public class PackingListSearchCriteria
    {
        public Guid? ProductMasterId { get; set; }
        public Guid? FactoryId { get; set; }
        public DateTime? PackingDateFrom { get; set; }
        public DateTime? PackingDateTo { get; set; }
        public string PackingNo { get; set; }
    }

}