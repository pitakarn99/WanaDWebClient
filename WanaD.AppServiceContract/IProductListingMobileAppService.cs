using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WanaD.AppServiceContract
{
    public interface IProductListingMobileAppService
    {
        Task<List<ProductionListData>> FindAsync(ProductionListParameter parameter);
        Task<int> Count(ProductionListSearchCriteria criteria);
        Task<List<ProductTypeData>> FindProductTypeAsync();
        Task<List<ProductMasterData>> FindProductMasterAutoCompleteAsync(ProductMasterSearchCriteria parameter);
        Task<List<OrderData>> FindOrderAutoCompleteAsync(ProductionListSearchCriteria parameter);
        Task<ProductData> LoadAsync(ScanQRCriteria scanQRCriteria);
        Task<Guid> ProductionSaveAsync(ProductionCreateData productionCreateData);
        Task<bool> ScanQr(Guid qrId);
        Task<ProductionData> FindByIdAsync(Guid productionId);
        Task<Guid> ProductionUpdateAsync(ProductionCreateData productionCreateData);
    }
}
