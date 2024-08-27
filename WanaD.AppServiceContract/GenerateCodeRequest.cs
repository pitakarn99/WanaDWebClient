using System;

namespace WanaD.AppServiceContract
{
    public class GenerateCodeRequest
    {
        public string Group { get; set; }
        public Guid? RefId { get; set; }
        public int Quantity { get; set; }

        public Guid? Id { get; set; }
        public string? CodeFrom { get; set; }
        public string? CodeTo { get; set; }
    }
}
