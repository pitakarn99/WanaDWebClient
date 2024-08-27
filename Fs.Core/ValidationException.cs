using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Validation;


namespace Fs.Core.Data
{
    public class ValidationException : Exception
    {
        public string Message { get; set; }
        public ValidationResults ValidationResults { get; set; }

        public ValidationException(string message, ValidationResults results)
        {
            Message = message;
            ValidationResults = results;
        }
    }
}
