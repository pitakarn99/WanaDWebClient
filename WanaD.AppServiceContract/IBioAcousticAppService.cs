using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WanaD.AppServiceContract
{
    public interface IBioAcousticAppService
    {
        public  Task<List<BioAcousticData>> FindAsync([FromBody] BioAcousticParameter parameter);
        public  Task<int> CountAsync([FromBody] BioAcousticSearchCriteria criteria);
    }
}
