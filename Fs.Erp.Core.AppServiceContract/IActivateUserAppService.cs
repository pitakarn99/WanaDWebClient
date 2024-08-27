using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core.AppServiceContract
{
    public interface IActivateUserAppService
    {
        Task SendActivateEmailAsync(SendActivateEmailData data);
        Task<bool> CheckTokenAsync(ActivateTokenRequest data);
        Task ActivateUserAsync(ActivateData data);
        Task CreatePasswordAsync(CreatePasswordData data);
    }
}
