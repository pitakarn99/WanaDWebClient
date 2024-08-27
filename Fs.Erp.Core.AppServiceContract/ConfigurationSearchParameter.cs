using Fs.Core.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class ConfigurationSearchParameter
    {
        public ConfigurationSearchCriteria SearchCriteria { get; set; }
        public PagingCriteria PagingCriteria { get; set; }
        public SortingCriteria SortingCriteria { get; set; }
    }
}
