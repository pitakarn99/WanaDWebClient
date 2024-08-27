

using Fs.Core.Data;
using Fs.Erp.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace WanaD.AppServiceContract
{
    public class ManageUserGroupMemberSearchParameter
    {
        public UserCriteria01 Criteria { get; set; }
        public SortingCriteria SortingCriteria { get; set; }
        public PagingCriteria PagingCriteria { get; set; }
    }
}
