using Fs.Erp.Core;
using Fs.Erp.Core.AppServiceContract;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core.AppServiceContract
{
    public interface IManageUserAppService
    {
        Task<List<UserData01>> FindAsync(ManageUserGroupMemberSearchParameter parameter);
        Task<long> CountAsync(UserCriteria01 criteria);
        Task RemoveAsync(Guid userUID);
        Task<UserData01> LoadAsync(Guid userUID);
        Task UpdateAsync(UserUpdateRequest request);
        Task<Guid> AddAsync(UserUpdateRequest request);
        Task<List<UserData01>> FindUserAutoCompleteDataAsync(string textInput);
        Task ImportAsync([FromBody] ImportRequest importRequest);
        Task<UserProfile> RetrieveUserProfileAsync();
        Task<List<LoginTypeData>> FindLoginTypeAsync();
        Task SignupUserAsync(UserUpdateRequest request);
        Task<bool> CheckUserExist(UserCheckExternalRequest request);
    }
}
