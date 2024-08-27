using System;
using System.Collections.Generic;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class OperationResources
    {
        public static string ApplicationCode = "Core";

        public static Guid ManageGroup = new Guid("BF4485BF-ADDD-4960-94FC-AF3D09BDFA74");
        public static Guid ViewGroup = new Guid("B2B218E6-4638-4150-8298-05808CACA99D");

        public static Guid ManageUser = new Guid("B6AD943E-AC22-482E-83A6-9BB20DAB2B14");
        public static Guid ViewUser = new Guid("4A4AAABD-2F15-43FB-BD35-BB7A5C148FC2");

        public static Guid ChangePassword = new Guid("F3C3A527-50E7-490B-878C-D5E254974CF8");
        public static Guid CreatePassword = new Guid("84ABC900-6D3C-47EA-A8F3-D4003240C0AB");

        public static Guid Activate = new Guid("EF859028-B4FB-44CE-86FB-4151E19F2384");

        public static Guid ManageConfiguration = new Guid("2d381ee1-a8e1-4b62-9648-df0406aa9f16");
        public static Guid ViewConfiguration = new Guid("8a0838ef-e2e7-4ddb-b92b-70581116cb2c");
    }
}
