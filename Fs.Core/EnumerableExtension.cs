using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Core
{
    public static class EnumerableExtension
    {
        public static bool Equal<T1, T2>(this IEnumerable<T1> left, IEnumerable<T2> right, Func<T1, T2, bool> matchCase)
        {
            return !left.Where(t1 => !right.Where(t2 => matchCase(t1, t2)).Any()).Any() &&
                   !right.Where(t2 => !left.Where(t1 => matchCase(t1, t2)).Any()).Any() &&
                   left.Count() == right.Count();
        }
        public static IOrderedEnumerable<TSource> OrderBy<TSource>(this IEnumerable<TSource> source, string path)
        {
            var result = source.OrderBy(t => t.GetValueFromPath(path));
            return result;
        }
        public static IOrderedEnumerable<TSource> OrderByDescending<TSource>(this IEnumerable<TSource> source, string path)
        {
            var result = source.OrderByDescending(t => t.GetValueFromPath(path));
            return result;
        }
        public static IOrderedEnumerable<TSource> ThenBy<TSource>(this IOrderedEnumerable<TSource> source, string path)
        {
            var result = source.ThenBy(t => t.GetValueFromPath(path));
            return result;
        }
        public static IOrderedEnumerable<TSource> ThenByDescending<TSource>(this IOrderedEnumerable<TSource> source, string path)
        {
            var result = source.ThenByDescending(t => t.GetValueFromPath(path));
            return result;
        }
    }
}
