using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core.AppServiceContract
{
    public interface IChangePasswordAppService
    {
        Task SendForgetPasswordEmailAsync(string email);
        Task<bool> CheckTokenAsync(ResetPasswordTokenRequest request);
        Task ChangePasswordAsync(ChangePasswordUpdateRequest request);
        Task ResetPasswordAsync(ResetPasswordUpdateRequest request);
        Task ResetPasswordAdminAsync(Guid userUID);
        Task<PasswordRequirementsDisplayData> LoadPasswordRequirementsDataAsync();
    }
}
