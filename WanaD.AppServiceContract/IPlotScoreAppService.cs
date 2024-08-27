using Fs.Erp.Core;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WanaD.AppServiceContract
{
    public interface IPlotScoreAppService
    {
        public Task<List<PlotScoreData>> FindAsync([FromBody] PlotScoreParameter parameter);
        public Task<int> CountAsync([FromBody] PlotScoreSearchCriteria criteria);
        public Task UpdateAsync([FromBody] PlotScoreData request);
        public Task<List<FarmAndPlotData>> FindFarmAsync([FromBody] string name);
        public Task<List<FileInfoData>> FileInfoData([FromBody] Guid id);

    }
}
