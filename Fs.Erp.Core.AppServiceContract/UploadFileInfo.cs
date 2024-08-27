using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;
using System.IO;

namespace Fs.Erp.Core.AppServiceContract
{
    [MessageContract]
    public class UploadFileInfo : IDisposable
    {
        [MessageHeader(MustUnderstand = true)]
        public Guid? Id { get; set; }

        [MessageHeader(MustUnderstand = true)]
        public string FileName;

        [MessageHeader(MustUnderstand = true)]
        public string FileExtension;

        [MessageHeader(MustUnderstand = true)]
        public long Length;

        [MessageHeader(MustUnderstand = true)]
        public bool IsNonOverrideName { get; set; }

        [MessageBodyMember(Order = 1)]
        public Stream FileByteStream;

        [MessageHeader(MustUnderstand = true)]
        public string Description { get; set; }

        [MessageHeader(MustUnderstand = true)]
        public Guid? RelationId { get; set; }

        [MessageHeader(MustUnderstand = true)]
        public int? RelationTypeValue { get; set; }

        [MessageHeader(MustUnderstand = true)]
        public string UploadFilePath { get; set; }

        public void Dispose()
        {
            // close stream when the contract instance is disposed. this ensures that stream is closed when file download is complete, since download procedure is handled by the client and the stream must be closed on server.
            // thanks Bhuddhike! http://blogs.thinktecture.com/buddhike/archive/2007/09/06/414936.aspx
            if (FileByteStream != null)
            {
                try { FileByteStream.Dispose(); }
                catch { }
                FileByteStream = null;
            }
        }
    }
}
