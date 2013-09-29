using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace OrderTracker.Web.Models
{
    public class LineItem
    {
        public int Id { get; set; }

        public int InvoiceId { get; set; }

        [DisplayName("Task")]
        public string Task { get; set; }

        [DisplayName("Rate")]
        [DataType(DataType.Currency)]
        public decimal Rate { get; set; }

        [DisplayName("Quantity")]
        public int Quantity { get; set; }
    }
}