using Fs.Core.Data;

namespace WanaD.AppServiceContract
{
    public class BiodiversityContractParameter
    {
        public BiodiversityContractSearchCriteria Criteria { get; set; }
        public SortingCriteria SortingCriteria { get; set; }
        public PagingCriteria PagingCriteria { get; set; }
    }
}
