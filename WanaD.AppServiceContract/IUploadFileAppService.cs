using Fs.Erp.Core.AppServiceContract;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WanaD.AppServiceContract
{
    public interface IUploadFileAppService
    {
        FileData Upload();
        Task<List<Fs.Erp.Core.FileInfoData>> UpdateAttachment(AttachmentRequest importRequest);
    }
}
