using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Core
{
     [DataContract]
    public class DataNotFoundValidation
    {
         [DataMember]
         public string Message { get; set; }
    }
}
