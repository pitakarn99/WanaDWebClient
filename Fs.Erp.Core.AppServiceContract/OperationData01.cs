using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class OperationData01
    {
        public string ApplicationCode { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public bool? IsRole { get; set; }
        public string IsRoleText
        {
            get { return IsRole == true ? "Role" : "Operation"; }
        }
        public Guid OperationUID { get; set; }
    }
}
