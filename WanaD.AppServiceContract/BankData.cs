

using System;

namespace WanaD.AppServiceContract
{
    public class BankData
    {
        public Guid Id { get;  set; }
        public string Name { get;  set; }
        public string DisplayName { get;  set; }
        public bool IsActive { get;  set; }
        public int Ordinal { get;  set; }
    }
}
