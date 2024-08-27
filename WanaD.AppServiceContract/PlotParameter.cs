using Fs.Core.Data;

namespace WanaD.AppServiceContract
{
    public class PlotParameter
    {
        public PlotSearchCriteria Criteria { get; set; }
        public SortingCriteria SortingCriteria { get; set; }
        public PagingCriteria PagingCriteria { get; set; }
    }
}
