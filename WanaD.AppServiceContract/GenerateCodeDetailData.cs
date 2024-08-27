

using System;

namespace WanaD.AppServiceContract
{
    public class GenerateCodeDetailData
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
        public string RefCode { get; set; }
        public string QRId { get; set; }
        public DateTime Date { get; set; }
   

    }
}
