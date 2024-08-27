using System;
using System.Collections.Generic;

namespace WanaD.AppServiceContract
{
    public class ProductMemberData
    {
        public Guid Id { get; set; }
        public Guid ParentProductId { get; set; }
        public Guid ChildProductId { get; set; }
        public string FarmName { get; set; }
        public string PlotName {  get; set; }
        public string TeaTypeName { get; set; }
        public string FactoryName { get; set; }
        public DateTime? ProductionDate { get; set; }
    }
}
