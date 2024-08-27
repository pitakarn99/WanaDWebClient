using System;
using System.Collections.Generic;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class ImportRequest
    {
        public string File { get; set; }
        public string LanguageCode { get; set; }
        public bool IsStructure { get; set; }

    }
}
