using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;
using Microsoft.Practices.EnterpriseLibrary.Validation.Integration.WCF;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using Fs.Core;
using System.Collections.ObjectModel;
using System.ServiceModel.Web;

namespace Fs.Erp.Core.AppServiceContract
{
    [ServiceContract]
    public interface IWebAuthenticationService
    {
        [OperationContract]
        [WebInvoke(Method = "POST",
            UriTemplate = "GetCurrentUserProfile",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        UserProfile GetCurrentUserProfile(bool isThrowEx = true);

        [OperationContract]
        [WebInvoke(Method = "POST",
            UriTemplate = "Logout",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        void Logout();
    }
}
