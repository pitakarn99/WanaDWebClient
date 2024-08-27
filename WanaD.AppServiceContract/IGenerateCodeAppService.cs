using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WanaD.AppServiceContract
{
    public interface IGenerateCodeAppService
    {
        Task<List<GenerateCodeData>> FindAsync(GenerateCodeParameter parameter);
        Task<int> Count(GenerateCodeSearchCriteria criteria);
        Task<Guid> AddAsync(GenerateCodeRequest request);
        Task<GenerateCodeData> LoadAsync(GenerateCodeSearchCriteria criteria);
        Task<List<QRData>> FindQRAsync(GenerateCodeParameter parameter);
        Task<int> QRCount(GenerateCodeSearchCriteria criteria);
        Task<List<FactoryAndFarmData>> FindBrandAsync(GenerateCodeSearchCriteria criteria);
    }
}
