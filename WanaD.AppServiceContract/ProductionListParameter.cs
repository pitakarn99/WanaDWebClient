using Fs.Core.Data;

namespace WanaD.AppServiceContract
{
    public class ProductionListParameter
    {
        public ProductionListSearchCriteria Criteria { get; set; }
        public SortingCriteria SortingCriteria { get; set; }
        public PagingCriteria PagingCriteria { get; set; }
    }
}
