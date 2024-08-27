using Fs.Core.Data;

namespace WanaD.AppServiceContract
{
    public class FactoryMemberParameter
    {
        public FactoryMemberSearchCriteria Criteria { get; set; }
        public SortingCriteria SortingCriteria { get; set; }
        public PagingCriteria PagingCriteria { get; set; }
    }
}
