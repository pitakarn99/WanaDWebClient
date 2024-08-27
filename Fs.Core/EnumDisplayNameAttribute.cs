using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;

namespace Fs.Core
{
    [AttributeUsage(AttributeTargets.Field)]
    public class EnumDisplayNameAttribute : System.ComponentModel.DisplayNameAttribute
    {
        public EnumDisplayNameAttribute(string data) : base(data) { }
    }

    public static class EnumExtension
    {
        public static string GetDisplayName(this Enum value)
        {
            //Using reflection to get the field info
            FieldInfo info = value.GetType().GetField(value.ToString());

            //Get the Description Attributes
            EnumDisplayNameAttribute[] attributes = (EnumDisplayNameAttribute[])info.GetCustomAttributes(typeof(EnumDisplayNameAttribute), false);

            //Only capture the description attribute if it is a concrete result (i.e. 1 entry)
            if (attributes.Length == 1)
            {
                return attributes[0].DisplayName;
            }
            else //Use the value for display if not concrete result
            {
                return value.ToString();
            }
        }
    }
}
