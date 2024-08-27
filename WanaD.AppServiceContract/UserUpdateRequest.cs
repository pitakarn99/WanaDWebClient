using Fs.Erp.Core;
using System;

namespace WanaD.AppServiceContract
{
    public class UserUpdateRequest
    {
        ////[StringLengthValidator(1, 50, MessageTemplateResourceName = "MSG004", MessageTemplateResourceType = typeof(Messages))]
        public string Login { get; set; }
        ////[StringLengthValidator(1, 50, MessageTemplateResourceName = "MSG005", MessageTemplateResourceType = typeof(Messages))]
        public string Password { get; set; }
        ////[StringLengthValidator(1, 50, MessageTemplateResourceName = "MSG002", MessageTemplateResourceType = typeof(Messages))]
        public string Name { get; set; }
        ////[StringLengthValidator(1, 50, MessageTemplateResourceName = "MSG006", MessageTemplateResourceType = typeof(Messages))]
        public string Email { get; set; }
        public bool? IsActive { get; set; }
        public bool IsLocked { get; set; }
        public bool IsGroup { get; set; }
        public string Provider { get; set; }
        public Guid? UserUID { get; set; }
        public DateTime? PasswordExpireDate { get; set; }
        public AuthType? AuthType { get; set; }
        public String ExternalUserId { get; set; }
        public bool IsRequirePassword { get; set; }
    }
}
