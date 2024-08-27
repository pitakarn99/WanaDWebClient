﻿using Fs.Core.Data;

namespace WanaD.AppServiceContract
{
    public class PlotScoreParameter
    {
        public PlotScoreSearchCriteria Criteria { get; set; }
        public SortingCriteria SortingCriteria { get; set; }
        public PagingCriteria PagingCriteria { get; set; }
    }
}
