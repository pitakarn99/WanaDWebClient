using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WanaD.AppServiceContract
{
    public class WanaDOperationResources
    {
        public static string ApplicationCode = "WanaD";
        //page web in admin
        public static Guid ManageGenerateCode = new Guid("0af27750-822c-4fde-a932-74a673f2cbb9");
        public static Guid ManageVisitPlot = new Guid("1d53f8ff-37ab-4844-85b9-42c49afd6bf8");
        public static Guid ManagePayment = new Guid("43fd65c7-9cb4-4173-9434-28322fe4e66f");
        public static Guid ViewBiodiversityService = new Guid("472822ce-15e6-4a33-b05f-fcdae9759664");
        public static Guid ViewVisitPlot = new Guid("61d828e8-393f-4cad-bac2-3541c84a1c8b");
        public static Guid ViewPayment = new Guid("64b08cf7-1d42-4eca-8d79-4a01c2a078ab");
        public static Guid ManageBiodiversityService = new Guid("6f81957d-7901-4e27-8dfe-cb24dafbd568");
        public static Guid ManageOrder = new Guid("9e30690f-5263-42c5-94a2-e72fc261bc8d");
        public static Guid ViewFarmRegister = new Guid("a6a047a2-35b0-43f7-8287-86c8e8b5d155");
        public static Guid ViewOrder = new Guid("a922a7b7-e094-418f-93b1-aaea539b5cc5");
        public static Guid ViewGenerateCode = new Guid("b6c56b27-2ad2-45c5-9a45-6b3ea5df7a29");
        public static Guid ManageFarmRegister = new Guid("e8d0aa98-858b-46bc-be6c-7883ebefcdc0");
        public static Guid ViewManageMaster = new Guid("f7d747dd-cea1-4bcb-954e-047c71fac657");
        public static Guid ManageManageMaster = new Guid("f80ac1c2-603f-45b5-b426-18cf0a8f83b0");

        //resourceprincipalrelation 
        public static Guid FactoryManager = new Guid("64f7e868-1e1d-4140-9cb9-761cff2d9195");
        public static Guid FactoryStaff = new Guid("4690d854-f4c4-442e-a984-e1fda1096c34");

        public static Guid PlotManager  = new Guid("0e09f4bd-d55b-482f-8784-c5fc3f0ad0b7");//สามารถรับเงินและ confirm รายการของ Biodiversity Contract ได้
        public static Guid FarmManager  = new Guid("499b83ea-e303-4c99-8a14-dda20cb41b7e");//สามารถดูการรับ/ส่งชาของ Picker ในฟาร์ม ที่ส่งไปยังโรงงานได้
        public static Guid Picker = new Guid("7a2d1c04-534d-49fc-b407-f3eb73a7ff26");//สามารถบันทึกข้อมูลการเก็บชา และปิดกระบวนการบันทึกผลผลิตชา ก่อนนำไปส่งให้โรงงานได้





        /*  public static Guid Manage_OrganizationUnit = new Guid("EDB03616-66E4-4720-9A03-040AFC34614D");
          public static Guid Read_OrganizationUnit = new Guid("161996C2-6D27-4CB0-9CD8-C12716C1FE50");*/
    }
}
