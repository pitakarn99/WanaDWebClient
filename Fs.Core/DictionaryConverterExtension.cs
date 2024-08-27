using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;

namespace Fs.Core
{
    public static class DictionaryConverterExtension
    {
        public static IDictionary<string, string> ToDictionary(this NameValueCollection col)
        {
            return col.AllKeys.ToDictionary(x => x, x => col[x]);
        }
    }
}
