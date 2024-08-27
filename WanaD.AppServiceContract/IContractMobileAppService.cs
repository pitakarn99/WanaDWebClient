using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WanaD.AppServiceContract
{
    public interface IContractMobileAppService
    {
        Task<List<ContractData>> FindAsync(ContractParameter parameter);
        Task<ContractDetailData> FindByIdAsync(Guid contractId);
        Task ContractWorkFlowAsync(ContractRequest contractRequest);
        Task<int> Count(ContractSearchCriteria criteria);

    }
}
