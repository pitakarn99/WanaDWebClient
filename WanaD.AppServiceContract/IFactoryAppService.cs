using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WanaD.AppServiceContract
{
    public interface IFactoryAppService
    {
        Task<List<FactoryData>> FindAsync(FactoryParameter parameter);
        Task<FactoryData> FindByIdAsync(Guid factoryId);
        Task<List<BankData>> FindBankAsync();
        Task<Guid> FactorySaveAsync(FactoryData factorySaveData);
        Task FactoryRemoveAsync(Guid factoryId);
        Task<int> Count(FactorySearchCriteria criteria);
        Task<List<FactoryMemberData>> FindFactoryMemberAsync(FactoryMemberParameter parameter);
        Task<int> FactoryMemberCount(FactoryMemberSearchCriteria criteria);
        Task<List<FactoryMemberData>> FindFactoryMemberAutoCompleteAsync(FactoryMemberSearchCriteria parameter);
        Task<Guid> AddFactoryMemberAsync(FactoryMemberData factoryMemberData);
        Task<Guid> UpdateFactoryMemberAsync(FactoryMemberData factoryMemberData);
        Task<Guid> RemoveFactoryMemberAsync(FactoryMemberData factoryMemberData);

    }
}
