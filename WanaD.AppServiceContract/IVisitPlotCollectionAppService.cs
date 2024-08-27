using Fs.Erp.Core;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WanaD.AppServiceContract
{
    public interface IVisitPlotCollectionAppService
    {
        public  Task<List<VisitPlotCollectionData>> FindAsync([FromBody] VisitPlotCollectionParameter parameter);
        public  Task<int> CountAsync([FromBody] VisitPlotCollectionSearchCriteria criteria);
        public  Task<Guid> AddAsync([FromBody] VisitPlotCollectionData request);
        public Task<List<FarmAndPlotData>> FindFarmAsync([FromBody]string name);
        public  Task<List<FileInfoData>> FileInfoData([FromBody] Guid id);
        public Task UpdateAsync([FromBody] VisitPlotCollectionData request);
    }
}
