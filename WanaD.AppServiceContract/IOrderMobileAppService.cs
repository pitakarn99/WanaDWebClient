using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WanaD.AppServiceContract
{
    public interface IOrderMobileAppService
    {
        Task<List<OrderData>> FindAsync(OrderParameter parameter);
        Task<int> Count(OrderSearchCriteria criteria);
        Task<OrderData> FindByIdAsync(Guid orderId);
        Task<Guid> OrderSaveAsync(OrderData orderSaveData);
        Task<Guid> OrderUpdateAsync(OrderData orderData);
        Task OrderRemoveAsync(Guid orderId);
        Task OrderWorkFlowAsync(OrderRequest orderRequest);
        Task<List<ProductTypeData>> FindProductTypeAsync();
        Task<List<DocHistoryData>> FindHistoryAsync(Guid docId);
        Task<List<DocDeliveryData>> FindDeliveryAsync(Guid orderId);

    }
}
