using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WanaD.AppServiceContract
{
    public interface IPackingMobileAppService
    {
        Task<List<PackingListData>> FindAsync(PackingListParameter parameter);
        Task<int> Count(PackingListSearchCriteria criteria);
        Task<List<ProductTypeData>> FindProductTypeAsync();
        Task<List<ProductMasterData>> FindProductMasterAutoCompleteAsync(ProductMasterSearchCriteria parameter);
        Task<ProductData> LoadAsync(ScanQRCriteria scanQRCriteria);
        Task<bool> ScanQr(Guid qrId);
        Task<ProductMasterData> FindProductMasterByIdAsync(Guid productMasterId);
        Task<Guid> PackingSaveAsync(PackingCreateData packingCreateData);
        Task<PackingData> FindByIdAsync(Guid productId);
        Task<List<ProductMasterData>> FindProductAutoCompleteAsync(ProductMasterSearchCriteria parameter);


    }
}
