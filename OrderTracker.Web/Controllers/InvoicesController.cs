using System.Collections.Generic;
using System.Web.Http;
using OrderTracker.Web.Data;
using OrderTracker.Web.Models;

namespace OrderTracker.Web.Controllers
{
    public class InvoicesController : ApiController
    {
        public IList<Invoice> Get()
        {
            return DataSingleton.GetAllInvoices();
        }

        public Invoice Get(int id)
        {
            return DataSingleton.GetInvoiceById(id);
        }

        public Invoice Post([FromBody] Invoice invoice)
        {
            return DataSingleton.AddInvoice(invoice);
        }

        public Invoice Put(int id, [FromBody] Invoice invoice)
        {
            invoice.Id = id;

            DataSingleton.UpdateInvoice(invoice);

            return invoice;
        }

        public void Delete(int id)
        {
            DataSingleton.DeleteInvoice(id);
        }
    }
}
