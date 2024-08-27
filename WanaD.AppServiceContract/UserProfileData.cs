using System;

namespace WanaD.AppServiceContract
{
    public class UserProfileData
    {
        public Guid Id { get; set; }
        public Guid? EthnicityId { get; set; }
        public Guid? ReligionId { get; set; }
        public string IdCardNo { get; set; }
        public string NameTH { get; set; }
        public string SurnameTH { get; set; }
        public string NameEn { get; set; }
        public string SurnameEn { get; set; }
        public DateTime? DateofBirth { get; set; }
        public int Gender { get; set; }
        public string PhoneNo { get; set; }
        public string Address { get; set; }
        public bool IsThaiNational { get; set; }
    }
}
