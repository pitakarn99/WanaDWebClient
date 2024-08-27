using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WanaD.AppServiceContract
{
    public interface IDeliveryMobileAppService
    {
        public Task<List<ProductData>> FindAsync([FromBody] ProductParameter parameter);
        public Task<int> Count([FromBody] ProductSearchCriteria criteria);
        public Task<ProductData> LoadAsync([FromBody] Guid id);
        public Task<List<PlotData>> FindListPlotAsync();
        public Task<List<TeaTypeData>> FindListTeaTypeAsync();
        public  Task AddAsync(DeliveryRequest request);
        public Task<ProductData> ScanQr(Guid qrId);
        public  Task UpdateAsync(ProductData request);
    }
}
