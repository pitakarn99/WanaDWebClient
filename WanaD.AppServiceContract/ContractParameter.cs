using Fs.Core.Data;

namespace WanaD.AppServiceContract
{
    public class ContractParameter
    {
        public ContractSearchCriteria Criteria { get; set; }
        public SortingCriteria SortingCriteria { get; set; }
        public PagingCriteria PagingCriteria { get; set; }
    }
}
