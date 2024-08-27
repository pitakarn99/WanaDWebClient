using Fs.Erp.Core;
using Fs.Erp.Core.AppServiceContract;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core.AppServiceContract
{
    public interface IAuditLogSearchAppService
    {
        Task<List<AuditLogSearchData>> FindAsync(AuditLogSearchParameter parameter);
        Task<List<AuditLogCategoryData01>> FindAuditLogCategoryDropdownAsync();
        Task<int> CountAsync(AuditLogSearchCriteria criteria);
    }
}
