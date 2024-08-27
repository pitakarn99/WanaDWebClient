using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core.AppServiceContract
{
    public interface IUploadFileAppService
    {
        Task<FileData> UploadAsync();
    }
}
