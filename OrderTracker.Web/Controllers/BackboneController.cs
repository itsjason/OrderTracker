using System.Web.Mvc;
using OrderTracker.Web.Data;

namespace OrderTracker.Web.Controllers
{
    public class BackboneController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
