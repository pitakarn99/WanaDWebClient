using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WanaD.AppServiceContract
{
    public interface IReceiveOrderMobileAppService
    {
        Task<List<ReceiveOrderData>> FindAsync(ReceiveOrderParameter parameter);
        Task<int> Count(ReceiveOrderSearchCriteria criteria);
        Task<ReceiveOrderDetailData> FindByIdAsync(Guid productId);
        Task<Guid> ReceiveOrderUpdateAsync(ReceiveOrderDetailData updateData);
        Task<List<ProductTypeData>> FindProductTypeAsync();
        Task<List<FactoryData>> FindFactoryAutoCompleteAsync(FactorySearchCriteria parameter);
        Task<List<ProductMasterData>> FindProductMasterAutoCompleteAsync(ProductMasterSearchCriteria parameter);
        Task<ReceiveOrderDetailData> ScanQr( Guid qrId);

    }
}
