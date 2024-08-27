using System;

namespace WanaD.AppServiceContract
{
    public class ResponsiblePersonSearchCriteria
    {
        public Guid FarmId { get;  set; }
        public Guid? PlotId { get;  set; }
        public Guid? UserId { get;  set; }
        public string Role { get;  set; }
        public string Name { get;  set; }
    }
}
