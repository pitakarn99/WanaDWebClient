using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core.AppServiceContract
{
    public interface ILanguageAppService
    {
        Task<IList<LanguageData>> FindAllLanguageAsync();
        Task<IList<LanguageData>> FindAllLanguageWithOutDefaultLanguageAsync();
    }
}
