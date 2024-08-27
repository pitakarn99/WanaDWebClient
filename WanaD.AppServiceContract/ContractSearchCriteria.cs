using System;

namespace WanaD.AppServiceContract
{
    public class ContractSearchCriteria
    {
        public DateTime? PeriodDateFrom { get; set; }
        public DateTime? PeriodDateTo { get; set; }
        public string ContractStatus { get; set; }
        public string ContractNo { get; set; }

    }
}
