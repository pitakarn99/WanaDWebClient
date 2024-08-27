using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using Fs.Erp.Core.AppServiceContract.Resources;

namespace Fs.Erp.Core.AppServiceContract
{
    public class ConfigurationUpdateRequest
    {
        public string Code { get; set; }

        //[StringLengthValidator(1, 50, MessageTemplateResourceName = "MSG014", MessageTemplateResourceType = typeof(Messages))]
        public string Value { get; set; }

        public DateTimeOffset? UpdDate { get; set; }
    }
}
