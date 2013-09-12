using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace OrderTracker.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                name: "LineItem",
                routeTemplate: "api/Invoices/{invoiceId}/LineItems/{id}",
                defaults: new { controller = "LineItems", id = RouteParameter.Optional });

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });
        }
    }
}
