using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WanaD.AppServiceContract
{
    public interface IOrderAppService
    {
        Task<List<OrderData>> FindAsync(OrderParameter parameter);
        Task<int> Count(OrderSearchCriteria criteria);
        Task<OrderData> FindByIdAsync(Guid orderId);
        Task<Guid> OrderSaveAsync(OrderData orderSaveData);
        Task<Guid> OrderUpdateAsync(OrderData orderData);
        Task OrderRemoveAsync(Guid orderId);
        Task<List<FactoryData>> FindFactoryAutoCompleteAsync(FactorySearchCriteria parameter);
        Task<List<ProductTypeData>> FindProductTypeAsync();
        Task<List<ProductMasterData>> FindProductMasterAutoCompleteAsync(ProductMasterSearchCriteria parameter);
        Task CloseOrderAsync(OrderRequest orderRequest);
        Task ReSubmitOrderAsync(OrderData orderRequest);
        Task WithdrawOrderAsync(OrderRequest orderRequest);

    }
}
