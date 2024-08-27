using Fs.Erp.Core;
using Fs.Erp.Core.AppServiceContract;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;


namespace WanaD.AppServiceContract
{
    public interface IManageUserGroupAppService
    {
        Task<List<Fs.Erp.Core.AppServiceContract.UserData01>> FindAsync(Fs.Erp.Core.AppServiceContract.ManageUserGroupMemberSearchParameter parameter);
        Task<long> CountAsync(UserCriteria01 criteria);
        Task RemoveAsync(Guid userUID);
        Task<Fs.Erp.Core.AppServiceContract.UserData01> LoadAsync(Guid userUID);
        Task UpdateAsync(Fs.Erp.Core.AppServiceContract.GroupUpdateRequest request);
        Task<Guid> AddAsync(Fs.Erp.Core.AppServiceContract.GroupUpdateRequest request);
        Task AddMemberAsync(Fs.Erp.Core.AppServiceContract.MemberUpdateRequest request);
        Task RemoveMemberAsync(Fs.Erp.Core.AppServiceContract.MemberUpdateRequest request);
        Task<List<Fs.Erp.Core.AppServiceContract.MemberData01>> FindMemberAsync(Fs.Erp.Core.AppServiceContract.ManageUserGroupMemberSearchParameter parameter);
        Task<long> CountMemberAsync(UserCriteria01 criteria);
        Task<List<Fs.Erp.Core.AppServiceContract.UserData01>> FindUserAutoCompleteDataAsync(string textInput);
        Task<UserProfile> RetrieveUserProfileAsync();
    }
}
