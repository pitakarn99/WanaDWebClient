using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Core
{
    public static class FsGeneralHelper
    {
        public static DateTimeOffset MaxDateTimeOffset(DateTimeOffset?[] listDatetime) 
        {
            var datetimes = listDatetime.Where(t => t.HasValue).Select(t => t.Value).ToList();
            if (datetimes.Count() == 0)
            {
                throw new FaultException<DataValidationException>(new DataValidationException() { Message = "No date time available for find max value" });
            }
            else
            {
                var overlappedExternalFactor = datetimes.Max();
                return overlappedExternalFactor;
            }
        }

        public static DateTimeOffset MinDateTimeOffset(DateTimeOffset?[] listDatetime)
        {
            var datetimes = listDatetime.Where(t => t.HasValue).Select(t => t.Value).ToList();
            if (datetimes.Count() == 0)
            {
                throw new FaultException<DataValidationException>(new DataValidationException() { Message = "No date time available for find min value" });
            }
            else
            {
                var overlappedExternalFactor = datetimes.Min();
                return overlappedExternalFactor;
            }
        }
    }
}
