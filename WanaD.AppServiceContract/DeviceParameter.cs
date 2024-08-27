using Fs.Core.Data;

namespace WanaD.AppServiceContract
{
    public class DeviceParameter
    {
        public DeviceSearchCriteria Criteria { get; set; }
        public SortingCriteria SortingCriteria { get; set; }
        public PagingCriteria PagingCriteria { get; set; }
    }
}
