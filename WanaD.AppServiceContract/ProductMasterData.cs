using System;
using System.Collections.Generic;

namespace WanaD.AppServiceContract
{
    public class ProductMasterData
    {
        public Guid Id { get; set; }
        public decimal TotalWeight { get; set; }
        public string PackagingSize { get; set; }
        public string PackagingType { get; set; }
        public string ProductMasterName { get; set; }
        public string Ingredient { get; set; }
        public bool IsActive { get; set; }
        public string TeaType { get; set; }
        public string Unit { get; set; }
        public Guid ProductTypeId { get; set; }
        public string ProductMasterNo { get; set; }
        public List<ProductMasterProcessingData> ProcessingDatas { get; set; }
        public decimal ProcessQty { get; set; }
        public string ProductTypeCode { get; set; }
    }
}
