using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Fs.Core.Logging
{

    public enum Priority
    {
        Low = 0, Medium, High
    }

    public class ApplicationLogCategory
    {
        public static string General = "GeneralApplicationLog";
    }

    public enum GeneralApplicationLogEvent
    {
        DispatcherUnhandledException = 0,
        ContainerInitializationFailure = 1,
        ServerOperationFailure = 2
    }

}
