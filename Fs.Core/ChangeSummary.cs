using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Fs.Core.Data
{
    public class ChangeSummary<TData,  TKey>
    {
        public IList<TData> AddingItems = new List<TData>();
        public IList<TData> UpdatingItems = new List<TData>();
        public IList<TKey> RemovingItems = new List<TKey>();
    }
}
