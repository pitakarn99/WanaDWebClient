﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace Fs.Core
{
    [DataContract]
    public class DataValidationException
    {
        [DataMember]
        public string Message { get; set; }
    }
}
