using Fs.Core.Data;

namespace WanaD.AppServiceContract
{
    public class PlotDeviceParameter
    {
        public PlotDeviceSearchCriteria Criteria { get; set; }
        public SortingCriteria SortingCriteria { get; set; }
        public PagingCriteria PagingCriteria { get; set; }
    }
}
