using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using Fs.Erp.Core.AppServiceContract.Resources;

namespace Fs.Erp.Core.AppServiceContract
{
    public class RoleUpdateRequest
    {
        public string ApplicationCode { get; set; }
        //[StringLengthValidator(1, 50, MessageTemplateResourceName = "MSG001", MessageTemplateResourceType = typeof(Messages))]
        public string Code { get; set; }
        //[StringLengthValidator(1, 50, MessageTemplateResourceName = "MSG002", MessageTemplateResourceType = typeof(Messages))]
        public string Name { get; set; }
        public short Type { get; set; }
        public bool IsReadOnly { get; set; }
    }
}
