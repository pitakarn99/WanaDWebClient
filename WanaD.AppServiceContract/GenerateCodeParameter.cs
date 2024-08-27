using Fs.Core.Data;

namespace WanaD.AppServiceContract
{
    public class GenerateCodeParameter
    {
        public GenerateCodeSearchCriteria Criteria { get; set; }
        public SortingCriteria SortingCriteria { get; set; }
        public PagingCriteria PagingCriteria { get; set; }
    }
}
