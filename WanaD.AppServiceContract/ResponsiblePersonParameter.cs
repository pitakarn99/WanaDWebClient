using Fs.Core.Data;

namespace WanaD.AppServiceContract
{
    public class ResponsiblePersonParameter
    {
        public ResponsiblePersonSearchCriteria Criteria { get; set; }
        public SortingCriteria SortingCriteria { get; set; }
        public PagingCriteria PagingCriteria { get; set; }
    }
}
