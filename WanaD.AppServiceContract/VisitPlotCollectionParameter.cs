using Fs.Core.Data;

namespace WanaD.AppServiceContract
{
    public class VisitPlotCollectionParameter
    {
        public VisitPlotCollectionSearchCriteria Criteria { get; set; }
        public SortingCriteria SortingCriteria { get; set; }
        public PagingCriteria PagingCriteria { get; set; }
    }
}
