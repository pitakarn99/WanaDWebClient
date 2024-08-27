using Fs.Core.Data;

namespace WanaD.AppServiceContract
{
    public class PackingListParameter
    {
        public PackingListSearchCriteria Criteria { get; set; }
        public SortingCriteria SortingCriteria { get; set; }
        public PagingCriteria PagingCriteria { get; set; }
    }
}
