﻿using System;

namespace WanaD.AppServiceContract
{
    public class PlotScoreSearchCriteria
    {
        public Guid? FarmId { get; set; }
        public Guid? PlotId { get; set; }
        public string StatusCode { get; set; }
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
    }
}
