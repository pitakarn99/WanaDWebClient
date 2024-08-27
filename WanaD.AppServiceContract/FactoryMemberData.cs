using System;
using System.Collections.Generic;

namespace WanaD.AppServiceContract
{
    public class FactoryMemberData
    {
        public Guid Id { get; set; }
        public Guid FactoryId { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string PhoneNo { get; set; }
        public List<string> ListRole { get; set; }       
        public FactoryMemberData FactoryMemberDataObj { get; set; }
    }
}
