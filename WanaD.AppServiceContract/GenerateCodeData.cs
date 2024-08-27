

using System;

namespace WanaD.AppServiceContract
{
    public class GenerateCodeData
    {
        public Guid Id { get; set; }
        public string Group { get; set; }
        public string NameEN { get; set; }
        public string NameTH { get; set; }
        public string Address { get; set; }
        public string PhoneNo { get; set; }
        public decimal Total { get; set; }
        public decimal Remain { get; set; }
        public DateTime LatestGenerateDate { get; set; }
   

    }
}
