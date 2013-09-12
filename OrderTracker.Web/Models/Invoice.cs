using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace OrderTracker.Web.Models
{
    public class Invoice
    {
        public Invoice()
        {
            LineItems = new List<LineItem>();
        }

        public int Id { get; set; }

        [DisplayName("Invoice Date")] 
        [DataType(DataType.Date)]
        public DateTime InvoiceDate { get; set; }

        [DisplayName("Customer Name")]
        public string CustomerName { get; set; }    
    
        public List<LineItem> LineItems { get; set; }        
    }
}