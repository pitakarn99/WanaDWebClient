using Fs.Core.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class ACLTemplateSearchParameter
    {
        public ACLTemplateSearchCriteria Criteria { get; set; }
        public PagingCriteria PagingCriteria { get; set; }
        public SortingCriteria SortingCriteria { get; set; }

    }
}
