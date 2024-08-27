using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Fs.Core.Data;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using Fs.Erp.Core.AppServiceContract.Resources;

namespace Fs.Erp.Core.AppServiceContract
{
    public class GroupUpdateRequest
    {
        public Guid? userUID { get; set; }
        public string Name { get; set; }
        public bool? IsActive { get; set; }
    }
}
