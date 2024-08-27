using System;
using System.Collections.Generic;
using System.Text;

namespace Fs.Erp.Core.AppServiceContract
{
    public class PasswordRequirementsDisplayData
    {
        public int MinLength { get; set; }
        public int MaxNeighboringCharacter { get; set; }
        public int MaxRepeatSameCharacter { get; set; }
        public int MinUniqueCharacters { get; set; }
        public bool RequireDigit { get; set; }
        public bool RequireLowercase { get; set; }
        public bool RequirePunctuation { get; set; }
        public bool RequireUppercase { get; set; }
    }
}
