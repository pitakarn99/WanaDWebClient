using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class MenuResources
    {
        /////////////////// CLIENT //////////////////////////////

        public static Guid Permission = new Guid("06C31884-A261-40AD-B26A-DD3D7090BEE1");
        public static Guid AuditLog = new Guid("2F65D602-302F-4491-AC29-9C99D8A78CA5");
        public static Guid Configuration = new Guid("20A2D26C-9958-49AB-BB34-DC9B33DEBD4D");
        public static Guid Group = new Guid("782AC902-0FA0-491C-A5D6-5A1E28C1172C");
        public static Guid User = new Guid("8BC5A8B5-7028-4EF9-BF44-3CE26F664744");
        public static Guid Stock = new Guid("3BADB45D-7B78-46B6-BA5C-2B7D5C444E9E");
        
        //File Menu
        public static Guid ChangePassword = new Guid("74bbd51f-3103-4af8-970d-1c0f2e5f524f");
        public static Guid Logout = new Guid("a968d8f0-9365-4028-8a24-b91758a8ea69");
        public static Guid StartupPage = new Guid("FF6415F3-8373-42BC-B3C9-2C731B147334");

        //Setting Menu
        public static Guid ChangeLanguageEN = new Guid("53dd6bd8-be55-4cc2-b1d5-3fa7a08017d5");
        public static Guid ChangeLanguageTH = new Guid("e7954b72-fc42-450e-9128-62e7e48b514b");

        //Help Menu
        public static Guid About = new Guid("56872c89-cd3d-40be-98f5-e48a17c48aa9");
        public static Guid Help = new Guid("6562606C-6D33-45DC-91B4-70DDAFF16F16");

        /////////////////// WEB //////////////////////////////
        public static Guid Configuration_Web = new Guid("a906d768-b7e7-4d29-aaa4-c28e79fd4da0");
        public static Guid ManageUser_Web = new Guid("d7aa9782-fb3a-425f-98fa-ba545cfe8139");
        public static Guid OrganizationUnit = new Guid("53e14685-dad5-498d-a877-c0bf3975f2b9");
    }
}
