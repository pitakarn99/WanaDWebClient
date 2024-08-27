using Fs.Core.Data;

namespace WanaD.AppServiceContract
{
    public class BioAcousticParameter
    {
        public BioAcousticSearchCriteria Criteria { get; set; }
        public SortingCriteria SortingCriteria { get; set; }
        public PagingCriteria PagingCriteria { get; set; }
    }
}
