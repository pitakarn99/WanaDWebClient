using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WanaD.Client.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace WanaD.Client.Controllers
{
    public class OidcController : Controller
    {
        public IActionResult Oidc(string program)
        {
            return View(program);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
