using System;

namespace WanaD.AppServiceContract
{
    public class GenerateCodeSearchCriteria
    {
        public string Group { get; set; }
        public string Name { get; set; }
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public Guid? QREntityId { get; set; }

    }
}
