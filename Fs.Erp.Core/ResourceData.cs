using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections.ObjectModel;
using System.Runtime.Serialization;

namespace Fs.Erp.Core
{
    [DataContract]
    public class ResourceData
    {
        [DataMember]
        public Guid ResourceId { get;  set; }

        [DataMember]
        public string Name { get;  set; }
    }
}
