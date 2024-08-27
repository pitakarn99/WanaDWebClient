using System;

namespace WanaD.AppServiceContract
{
    public class FactoryMemberSearchCriteria
    {
        public Guid FactoryId { get;  set; }
        public Guid UserId { get;  set; }
        public string Role { get;  set; }
        public string Name { get;  set; }
    }
}
