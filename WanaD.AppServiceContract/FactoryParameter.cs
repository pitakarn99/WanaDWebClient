using Fs.Core.Data;

namespace WanaD.AppServiceContract
{
    public class FactoryParameter
    {
        public FactorySearchCriteria Criteria { get; set; }
        public SortingCriteria SortingCriteria { get; set; }
        public PagingCriteria PagingCriteria { get; set; }
    }
}
