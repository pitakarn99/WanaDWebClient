using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Unity;

namespace Fs.Core
{
    public class NewInstanceLifetimeManager : LifetimeManager
    {
        private LifetimeManager baseManager;
        private Func<object> sourceFunc = null;

        public NewInstanceLifetimeManager(Func<object> sourceFunc,
                                                        LifetimeManager baseManager = null)
        {   
            this.sourceFunc = sourceFunc;
            this.baseManager = baseManager;
        }

        public override object GetValue()
        {
            object result = null;
            
            if(baseManager != null) result = baseManager.GetValue();

            if (result == null)
            {
                result = sourceFunc();

                if (baseManager != null)
                {
                    baseManager.SetValue(result);
                }
            }

            return result;
        }

        public override void RemoveValue()
        {
            if (baseManager != null)
            {
                baseManager.RemoveValue();
            }
        }

        public override void SetValue(object newValue)
        {
            if (baseManager != null)
            {
                baseManager.SetValue(newValue);
            }
        }
    }   

}
