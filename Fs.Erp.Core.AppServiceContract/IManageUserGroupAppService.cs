using Fs.Erp.Core;
using Fs.Erp.Core.AppServiceContract;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core.AppServiceContract
{
    public interface IManageUserGroupAppService
    {
        Task<List<UserData01>> FindAsync(ManageUserGroupMemberSearchParameter parameter);
        Task<long> CountAsync(UserCriteria01 criteria);
        Task RemoveAsync(Guid userUID);
        Task<UserData01> LoadAsync(Guid userUID);
        Task UpdateAsync(GroupUpdateRequest request);
        Task<Guid> AddAsync(GroupUpdateRequest request);
        Task AddMemberAsync(MemberUpdateRequest request);
        Task RemoveMemberAsync(MemberUpdateRequest request);
        Task<List<MemberData01>> FindMemberAsync(ManageUserGroupMemberSearchParameter parameter);
        Task<long> CountMemberAsync(UserCriteria01 criteria);
        Task<List<UserData01>> FindUserAutoCompleteDataAsync(string textInput);
        Task<UserProfile> RetrieveUserProfileAsync();
    }
}
