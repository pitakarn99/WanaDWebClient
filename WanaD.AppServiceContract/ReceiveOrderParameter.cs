using Fs.Core.Data;

namespace WanaD.AppServiceContract
{
    public class ReceiveOrderParameter
    {
        public ReceiveOrderSearchCriteria Criteria { get; set; }
        public SortingCriteria SortingCriteria { get; set; }
        public PagingCriteria PagingCriteria { get; set; }
    }
}
