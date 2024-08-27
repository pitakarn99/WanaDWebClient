using Fs.Core.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Core
{
    public class SearchParameters<T> : SearchParameters
    {
        public T Criteria { get; set; }
    }

    public class SearchParameters
    {
        public PagingCriteria PagingCriteria { get; set; }
        public SortingCriteria SortingCriteria { get; set; }
    }
}
