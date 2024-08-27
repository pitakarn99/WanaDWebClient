using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core.AppServiceContract
{
    public interface IConfigurationAppService
    {
        Task<IList<ConfigurationData>> FindAsync(ConfigurationSearchParameter configurationSearchParameter);
        Task<List<ConfigurationItemCategoryData>> FindCategoryDataAsync();
        Task<int> CountAsync(ConfigurationItemCategorySearchCriteria searchCriteria);
        Task UpdateAsync(ConfigurationRequest configurationItemCategoryRequest);
    }
}
