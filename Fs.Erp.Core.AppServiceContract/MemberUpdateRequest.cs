using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using Fs.Erp.Core.AppServiceContract.Resources;

namespace Fs.Erp.Core.AppServiceContract
{
    public class MemberUpdateRequest
    {
        //[StringLengthValidator(1, 50, MessageTemplateResourceName = "MSG001", MessageTemplateResourceType = typeof(Messages))]
        public Guid GroupUID { get; set; }
        //[StringLengthValidator(1, 50, MessageTemplateResourceName = "MSG001", MessageTemplateResourceType = typeof(Messages))]
        public Guid UserUID { get; set; }
    }
}
