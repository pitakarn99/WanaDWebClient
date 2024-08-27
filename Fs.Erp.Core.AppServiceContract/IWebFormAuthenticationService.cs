using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;
using Fs.Core;
using Microsoft.Practices.EnterpriseLibrary.Validation.Integration.WCF;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using System.ServiceModel.Web;

namespace Fs.Erp.Core.AppServiceContract
{
    [ServiceContract]
    public interface IWebFormAuthenticationService : IWebAuthenticationService
    {
        [OperationContract]
        [WebInvoke(Method = "POST",
            UriTemplate = "Login",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        LoginResult Login(string login, string password, string realm = null);

        [OperationContract]
        [WebInvoke(Method = "POST",
            UriTemplate = "CheckPasswordExpire",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        bool CheckPasswordExpire(string loginName);
    }
}
