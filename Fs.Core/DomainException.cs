using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Fs.Core
{
    public class DomainException : Exception
    {
        public DomainException(string message) : base(message) { }
    }
}
