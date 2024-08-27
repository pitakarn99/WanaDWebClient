using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core.AppServiceContract
{
    public interface IMenuAppService
    {
        Task<List<MenuData>> GenerateMenuAsync(MenuParameter menuParameter);
        Task<List<MenuData>> GenerateMenuAsync2(MenuParameter2 menuParameter);
        Task<List<MenuData>> GenerateMenuAsync3(MenuParameter menuParameter);
        Task<UserProfile> RetrieveUserProfileAsync();
    }
}