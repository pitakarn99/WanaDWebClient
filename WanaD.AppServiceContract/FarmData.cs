

using System;

namespace WanaD.AppServiceContract
{
    public class FarmData
    {
        public Guid Id { get; set; }
        public string OwnerName { get; set; }
        public string Name { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string Address { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Guid ReligionId { get; set; }
        public Guid EthnicityId { get; set; }
        public string PhoneNumber { get; set; }
        public string IDNumber { get; set; }
        public byte Gender { get; set; }
        public bool IsThaiNationality { get; set; }
        public string Code { get; set; }
    }
}
