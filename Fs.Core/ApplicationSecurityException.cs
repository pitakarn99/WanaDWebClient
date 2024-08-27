using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;
using System.Runtime.Serialization;

namespace Fs.Core
{
    [DataContract]
    public class ApplicationSecurityException
    {
        [DataMember]
        public string Message { get; set; }
    }
}
