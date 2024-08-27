using Fs.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fs.Erp.Core
{
    public class OrganizationUnitTranslateData : ITranslateObject
    {
        public Guid Id { get; set; }
        public string LanguageCode { get; set; }
        public Guid OrganizationUnitId { get; set; }
        [TranslationField(typeof(Resources.EnumMessages), "Name", true, false)]
        public string Name { get; set; }
        [TranslationField(typeof(Resources.EnumMessages), "BranchName")]
        public string BranchName { get; set; }
        [TranslationField(typeof(Resources.EnumMessages), "Address", false, true)]
        public string Address { get; set; }

    }
}
