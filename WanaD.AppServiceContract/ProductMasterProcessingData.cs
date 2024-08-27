using System;

namespace WanaD.AppServiceContract
{
    public class ProductMasterProcessingData
    {
        public Guid Id { get; set; }
        public Guid ProductMasterId { get; set; }
        public string Processing { get; set; }
        public int Ordinal { get; set; }
    }
}
