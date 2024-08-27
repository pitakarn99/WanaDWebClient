using System;

using Fs.Erp.Core;

namespace WanaD.AppServiceContract
{
    public class UserData01
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public bool IsGroup { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsLocked { get; set; }
        public Guid? UserUID { get; set; }
        public string Realm { get; set; }
        public DateTime? PasswordExpireDate { get; set; }
        public AuthType? AuthType { get; set; }
        public string Provider { get; set; }
        public string ExternalUserId { get; set; }
        public bool IsRequirePassword { get; set; }
        //foruserProfile
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
        public bool IsFirstLogin { get; set; }
        public bool IsAgreePrivacy { get; set; }
        public string RoleMobile { get; set; }
        public string NameFarmOrFactory { get; set; }
    }
}
