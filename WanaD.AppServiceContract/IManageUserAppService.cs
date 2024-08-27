using Fs.Erp.Core;

using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace WanaD.AppServiceContract
{
    public interface IManageUserAppService
    {
        Task<List<UserData01>> FindAsync(ManageUserGroupMemberSearchParameter parameter);
        Task<long> CountAsync(UserCriteria01 criteria);
        Task RemoveAsync(Guid userUID);
        Task<UserData01> LoadAsync(Guid userUID);
        Task UpdateAsync(UserData01 request);
        Task<Guid> AddAsync(UserData01 request);
        Task FirstLoginLineConnectAsync(string externalLineId);
        public  Task AgreePrivacyAsync();
        Task FirstLoginCreatePasswordAsync(FirstLoginCreatePasswordRequest request);
        Task<UserData01> FindUserByExternalIdAsync(FindUserByExternalIdRequest request);
        Task<UserData01> LoadCurrentUserProfileAsync();
        Task<List<UserData01>> FindInternalUserAsync(ManageUserGroupMemberSearchParameter parameter);
        public  Task UpdateDeviceTokenAsync([FromBody] DeviceTokenData request);
        public  Task RemoveDeviceTokenAsync([FromBody] DeviceTokenData request);
    }
}
