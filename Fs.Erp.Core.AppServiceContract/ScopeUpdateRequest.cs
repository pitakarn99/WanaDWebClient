using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using Fs.Erp.Core.AppServiceContract.Resources;

namespace Fs.Erp.Core.AppServiceContract
{
    public class ScopeUpdateRequest
    {
        // for Scope_Role_Group
        public Int64 ScopeId { get; set; }
        [NotNullValidator(MessageTemplateResourceName = "MSG_SCOPEROLEGROUP_001", MessageTemplateResourceType = typeof(Messages))]
        public string RoleCode { get; set; }
        [NotNullValidator(MessageTemplateResourceName = "MSG_SCOPEROLEGROUP_002", MessageTemplateResourceType = typeof(Messages))]
        public string GroupCode { get; set; }

        // for Scope Management
        [StringLengthValidator(1, 50, MessageTemplateResourceName = "MSG_SCOPE_001", MessageTemplateResourceType = typeof(Messages))]
        public string Description { get; set; }
        [StringLengthValidator(1, 50, MessageTemplateResourceName = "MSG_SCOPE_002", MessageTemplateResourceType = typeof(Messages))]
        public string Name { get; set; }
        //[RegexValidator(@"[1-9]+",MessageTemplateResourceName = "MSG_SCOPE_003" , MessageTemplateResourceType = typeof(Messages))]
        public string Type { get; set; }
    }
}
