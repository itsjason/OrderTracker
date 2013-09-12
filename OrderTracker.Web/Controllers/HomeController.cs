using System.Web.Mvc;
using System.Web.UI.WebControls;
using OrderTracker.Web.Data;
using OrderTracker.Web.Models;

namespace OrderTracker.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View(DataSingleton.GetAllInvoices());
        }

        public ActionResult InvoiceDetail(int id)
        {
            return View(DataSingleton.GetInvoiceById(id));
        }       

        public ActionResult DeleteInvoice(int id)
        {
            DataSingleton.DeleteInvoice(id);

            return View("Index", DataSingleton.GetAllInvoices());
        }

        public ActionResult DeleteLineItem(int id, int lineItemId)
        {
            DataSingleton.DeleteLineItem(id, lineItemId);

            return View("InvoiceDetail", DataSingleton.GetInvoiceById(id));
        }

        public ActionResult AddInvoice()
        {
            var invoice = new Invoice();

            return View("InvoiceDetail", invoice);
        }
    }
}
