

using System;
namespace WanaD.AppServiceContract
{
    public class FactoryData
    {
        public Guid Id { get; set; }
        public Guid? OwnerId { get; set; }
        public string NameTH { get; set; }
        public string NameEN { get; set; }
        public string Address { get; set; }
        public Guid BankId { get; set; }
        public string BankAccountNo { get; set; }
        public string BankAccountHolder { get; set; }
        public string Code { get; set; }
        public bool IsActive { get; set; }
    }
}
