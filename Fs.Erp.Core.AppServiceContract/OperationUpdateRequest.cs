using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using Fs.Erp.Core.AppServiceContract.Resources;

namespace Fs.Erp.Core.AppServiceContract
{
    public class OperationUpdateRequest
    {
        //[StringLengthValidator(1, 50, MessageTemplateResourceName = "MSG010", MessageTemplateResourceType = typeof(Messages))]
        public string ApplicationCode { get; set; }
        //[NotNullValidator(MessageTemplateResourceName = "MSG_ROLEOPERATION_002", MessageTemplateResourceType = typeof(Messages))]
        public string Code { get; set; }
        //[StringLengthValidator(1, 50, MessageTemplateResourceName = "MSG002", MessageTemplateResourceType = typeof(Messages))]
        public string Name { get; set; }
        public string RoleCode { get; set; }

        public bool? IsRole { get; set; }

        public Guid? RoleUID { get; set; }
        public Guid OperationUID { get; set; }
    }
}
