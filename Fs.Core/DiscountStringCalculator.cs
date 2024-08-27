using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace Fs.Core
{
    public class DiscountStringCalculator
    {
        public decimal Calculate(String discountRemark, decimal setPrice)
        {
            decimal temp = setPrice;
            if (string.IsNullOrEmpty(discountRemark) || !Regex.IsMatch(discountRemark, @"^\S*(\+\S+)*\.*\S+(\+\S+)*\.*\S*\%*$"))
            {
                return 0;
            }
            List<decimal> numList = discountRemark.Replace("%",string.Empty).Split('+').Select(t => Convert.ToDecimal(t)).ToList();

            foreach (decimal item in numList)
            {
                setPrice = setPrice * (100 - item) / 100;
            }
            return temp - setPrice;
        }

    }
}
