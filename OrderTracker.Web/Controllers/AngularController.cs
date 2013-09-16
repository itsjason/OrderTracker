﻿using System.Web.Mvc;
using OrderTracker.Web.Data;

namespace OrderTracker.Web.Controllers
{
    public class AngularController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult InvoiceDetail(int id)
        {
            return View();
        }

        public ActionResult AddInvoice()
        {
            return View("InvoiceDetail");
        }

    }
}
