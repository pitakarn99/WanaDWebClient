using Fs.Erp.Core;
using Fs.Erp.Core.AppServiceContract;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core.AppServiceContract
{
    public interface IACLTemplateAppService
    {
        Task<List<ACLTemplateCategoryData>> FindTemplateAsync(ACLTemplateSearchParameter parameter);
        Task SaveTemplateAsync(ACLTemplateUpdateParameter parameter);
        Task<List<ResourceData>> LoadResourceAsync(string applicationCode);
        Task<List<ModuleData>> LoadModuleListAsync();
    }
}
