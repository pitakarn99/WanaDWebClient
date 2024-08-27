using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using Fs.Erp.Core.AppServiceContract.Resources;

namespace Fs.Erp.Core.AppServiceContract
{
    public class ACLUpdateRequest
    {
        public Int64? Id { get; set; }
        public string ApplicationCode { get; set; }
        public Guid? ResourceId { get; set; }
        public string RelationCode { get; set; }
        public string StateCode { get; set; }

        //[NotNullValidator(MessageTemplateResourceName = "MSG015", MessageTemplateResourceType = typeof(Messages))]
        public Guid OperationUID { get; set; }

        public Guid? UserUID { get; set; }
    }
}
