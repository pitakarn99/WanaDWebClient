using System;
using System.Collections.Generic;

namespace WanaD.AppServiceContract
{
    public class ResponsiblePersonData
    {
        public Guid Id { get; set; }
        public Guid FarmId { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public List<string> ListRole { get; set; }
        public List<Guid?> ListPlotId { get; set; }        
        public ResponsiblePersonData ResponsiblePersonDataObj { get; set; }
    }
}
