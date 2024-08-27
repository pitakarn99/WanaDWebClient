using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WanaD.AppServiceContract
{
    public interface IManageBiodiversityContractAppService
    {
        public  Task<List<BiodiversityContractData>> FindAsync( BiodiversityContractParameter parameter);
        public  Task<int> CountAsync( BiodiversityContractSearchCriteria criteria);
        public  Task<Guid> AddAsync( BiodiversityContractData request);
        public  Task<List<BiodiversityContractData>> FindEvaluateAsync( BiodiversityContractParameter parameter);
        public  Task<int> CountEvaluateAsync(BiodiversityContractSearchCriteria criteria);
        public Task<List<BiodiversityContractFarmData>> FindFarmAsync( BiodiversityContractFarmSearchCriteria criteria);
        public  Task CancelContract( Guid id);
        public  Task UpdateEvaluateAsync( BiodiversityContractData request);
        public  Task BackgroundJobBiodiversityContract();
        public  Task<BioAcousticScoreData> FindBioAcousticScoreAsync( BioAcousticScoreSearchCriteria criteria);
    }
}
