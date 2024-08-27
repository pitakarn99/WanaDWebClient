using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Unity;

namespace Fs.Core
{
    public static class UnityExtension
    {
        public static TResult TryResolve<TResult>(this IUnityContainer container, string resloveName, TResult defaultValue)
        {
            try
            {
                return container.Resolve<TResult>(resloveName);
            }
            catch
            {
                return defaultValue;
            }
        }

        public static IUnityContainer GetRootContainer(this IUnityContainer container)
        {
            return FindRootUnityContainer(container);
        }

        private static IUnityContainer FindRootUnityContainer(IUnityContainer container)
        {
            if (container.Parent == null)
                return container;
            else
                return FindRootUnityContainer(container.Parent);
        }
    }
}
