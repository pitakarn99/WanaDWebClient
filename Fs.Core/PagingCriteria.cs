using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Fs.Core.Data
{
    public class PagingCriteria
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }

        public override bool Equals(object obj)
        {
            if (Object.ReferenceEquals(this,obj)) return true;
            PagingCriteria criteria = obj as PagingCriteria;
            if (criteria == null) return false;
            return (this.PageIndex == criteria.PageIndex) && (this.PageSize == criteria.PageSize);
        }
        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }
}
