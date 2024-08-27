using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using Fs.Erp.Core.AppServiceContract.Resources;

namespace Fs.Erp.Core.AppServiceContract
{
    public class ChangePasswordUpdateRequest
    {
        //[StringLengthValidator(1, RangeBoundaryType.Inclusive, 0, RangeBoundaryType.Ignore, MessageTemplateResourceName = "ChangePassword_001", MessageTemplateResourceType = typeof(Messages))]
        public string OldPassword { get; set; }
        //[StringLengthValidator(1, RangeBoundaryType.Inclusive, 0, RangeBoundaryType.Ignore, MessageTemplateResourceName = "ChangePassword_002", MessageTemplateResourceType = typeof(Messages))]
        public string NewPassword { get; set; }
        //[StringLengthValidator(1, RangeBoundaryType.Inclusive, 0, RangeBoundaryType.Ignore, MessageTemplateResourceName = "ChangePassword_003", MessageTemplateResourceType = typeof(Messages))]
        public string ConfirmPassword { get; set; }
    }
}
