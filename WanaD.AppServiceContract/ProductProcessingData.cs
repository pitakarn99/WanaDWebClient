using System;

namespace WanaD.AppServiceContract
{
    public class ProductProcessingData
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public Guid ProductMasterProcessingId { get; set; }
        public bool IsCompleted { get; set; }
        public string ProcessingName { get; set; }
    }
}
