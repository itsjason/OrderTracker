using System.Collections.Generic;
using System.Web.Http;
using OrderTracker.Web.Data;
using OrderTracker.Web.Models;

namespace OrderTracker.Web.Controllers
{
    public class LineItemsController : ApiController
    {
        public IList<LineItem> Get(int invoiceId)
        {
            return DataSingleton.GetLineItemsByInvoice(invoiceId);
        }

        public LineItem Get(int invoiceId, int id)
        {
            return DataSingleton.GetLineItemById(invoiceId, id);
        }

        public LineItem Post(int invoiceId, [FromBody] LineItem lineItem)
        {
            lineItem.InvoiceId = invoiceId;
            
            return DataSingleton.AddLineItem(lineItem);
        }

        public LineItem Put(int invoiceId, int id, [FromBody] LineItem lineItem)
        {
            lineItem.InvoiceId = invoiceId;
            lineItem.Id = id;

            DataSingleton.UpdateLineItem(lineItem);

            return lineItem;
        }

        public void Delete(int invoiceId, int id)
        {
            DataSingleton.DeleteLineItem(invoiceId, id);
        }
    }
}
