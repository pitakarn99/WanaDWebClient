using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;

namespace Fs.Erp.Core.AppServiceContract
{
    [MessageContract]
    public class UploadFileResult
    {
        [MessageHeader(MustUnderstand = true)]
        public string FileName { get; set; }

        [MessageHeader(MustUnderstand = true)]
        public Guid Id { get; set; }


    }
}
