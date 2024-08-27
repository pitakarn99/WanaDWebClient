using Fs.Core.Data;

namespace WanaD.AppServiceContract
{
    public class OrderParameter
    {
        public OrderSearchCriteria Criteria { get; set; }
        public SortingCriteria SortingCriteria { get; set; }
        public PagingCriteria PagingCriteria { get; set; }
    }
}
