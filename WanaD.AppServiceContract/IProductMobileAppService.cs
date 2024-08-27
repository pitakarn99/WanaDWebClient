using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WanaD.AppServiceContract
{
    public interface IProductMobileAppService
    {
        public Task<List<ProductData>> FindAsync([FromBody] ProductParameter parameter);
        public Task<int> Count([FromBody] ProductSearchCriteria criteria);
        public  Task<bool> ScanQr(Guid qrId);
        public Task<Guid> AddAsync(ProductData request);
        public Task UpdateAsync(ProductData request);
        public Task<ProductData> LoadAsync([FromBody] Guid id);
        public Task<List<PlotData>> FindListPlotAsync();
        public Task<List<TeaTypeData>> FindListTeaTypeAsync();
    }
}
