using System;
using System.Collections.Generic;

namespace WanaD.AppServiceContract
{
    public class DeviceAPIData
    {
        public string date { get; set; }
        public List<decimal> coordinate { get; set; }
        public decimal score { get; set; }
        public Dictionary<string, List<string>> species { get; set; }
    }
}
