using Fs.Core.Data;

namespace WanaD.AppServiceContract
{
    public class ProductParameter
    {
        public ProductSearchCriteria Criteria { get; set; }
        public SortingCriteria SortingCriteria { get; set; }
        public PagingCriteria PagingCriteria { get; set; }
    }
}
