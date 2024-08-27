using System;

namespace WanaD.AppServiceContract
{
    public class BiodiversityContractSearchCriteria
    {
        public string ContractNo { get; set; }       
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }       
        public string PaymentRequestNo { get; set; }  
        public string StatusCode { get; set; }
    }
}
