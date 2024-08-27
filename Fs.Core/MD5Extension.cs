using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography;

namespace Fs.Core.Data
{
    public static class MD5Extension
    {
        public static string ComputeHash(this MD5 md5, string value)
        {
            byte[] hashValue = md5.ComputeHash(new UTF8Encoding().GetBytes(value));
            return BitConverter.ToString(hashValue).Replace("-", "").ToLowerInvariant();
        }
    }
}
