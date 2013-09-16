using System;
using System.Collections.Generic;
using System.Linq;
using OrderTracker.Web.Models;

namespace OrderTracker.Web.Data
{
    public static class DataSingleton
    {
        private static readonly List<Invoice> Invoices;

        private static readonly object Lock;

        static DataSingleton()
        {
            Lock = new object();
            Invoices = GetSeedData();
        }

        public static Invoice AddInvoice(Invoice invoiceToAdd)
        {            
            lock (Lock)
            {
                var id = GetNextInvoiceId();
                invoiceToAdd.Id = id;
                Invoices.Add(invoiceToAdd);
            }

            return invoiceToAdd;
        }

        public static LineItem AddLineItem(LineItem lineItem)
        {            
            lock (Lock)
            {
                var id = GetNextLineItemId();
                lineItem.Id = id;

                var invoice = Invoices.First(_ => _.Id == lineItem.InvoiceId);
                invoice.LineItems.Add(lineItem);
            }

            return lineItem;
        }

        public static void DeleteInvoice(int id)
        {
            lock (Lock)
            {
                var invoiceIndex = Invoices.FindIndex(_ => _.Id == id);                

                Invoices.RemoveAt(invoiceIndex);
            }
        }

        public static void DeleteLineItem(int invoiceId, int lineItemId)
        {
            lock (Lock)
            {
                var invoice = Invoices.First(_ => _.Id == invoiceId);
                var index = invoice.LineItems.FindIndex(_ => _.Id == lineItemId);

                invoice.LineItems.RemoveAt(index);
            }
        }

        public static void UpdateInvoice(Invoice invoiceToUpdate)
        {
            lock (Lock)
            {
                var invoiceIndex = Invoices.FindIndex(_ => _.Id == invoiceToUpdate.Id);

                Invoices[invoiceIndex].InvoiceDate = invoiceToUpdate.InvoiceDate;
                Invoices[invoiceIndex].CustomerName = invoiceToUpdate.CustomerName;
            }
        }

        public static void UpdateLineItem(LineItem lineItem)
        {
            lock (Lock)
            {
                var invoice = Invoices.First(_ => _.Id == lineItem.InvoiceId);
                var index = invoice.LineItems.FindIndex(_ => _.Id == lineItem.Id);

                invoice.LineItems[index] = lineItem;
            }
        }

        public static Invoice GetInvoiceById(int id)
        {
            return Invoices.First(_ => _.Id == id);
        }

        public static IList<Invoice> GetAllInvoices()
        {
            return Invoices;
        }

        public static LineItem GetLineItemById(int invoiceId, int lineItemId)
        {
            var invoice = Invoices.First(_ => _.Id == invoiceId);

            return invoice.LineItems.First(_ => _.Id == lineItemId);
        }

        public static IList<LineItem> GetLineItemsByInvoice(int invoiceId)
        {
            return Invoices.First(_ => _.Id == invoiceId).LineItems;
        }

        private static int GetNextInvoiceId()
        {
            return Invoices.Max(_ => _.Id) + 1;
        }

        private static int GetNextLineItemId()
        {
            return Invoices.Select(invoice => !invoice.LineItems.Any() ? 0: invoice.LineItems.Max(_ => _.Id)).Concat(new[] { 0 }).Max() + 1;
        }       

        private static List<Invoice> GetSeedData()
        {
            var invoiceList = new List<Invoice>
            {
                new Invoice
                {
                    Id = 1,
                    CustomerName = "Farm Credit Services of America",
                    InvoiceDate = DateTime.Now.AddDays(-10),
                    LineItems = new List<LineItem>
                    {
                        new LineItem { Id = 1, InvoiceId = 1, Quantity = 2, Rate = 500, Task = "CHL" },
                        new LineItem { Id = 2, InvoiceId = 1, Quantity = 1, Rate = 10, Task = "ABF" },
                        new LineItem { Id = 3, InvoiceId = 1, Quantity = 10, Rate = 250, Task = "AgDirect" },
                    }
                },
                new Invoice
                {
                    Id = 2,
                    CustomerName = "Felt Bicycles",
                    InvoiceDate = DateTime.Now.AddDays(-5),
                    LineItems = new List<LineItem>
                    {
                        new LineItem { Id = 4, InvoiceId = 2, Quantity = 1, Rate = 3000, Task = "Bike" },
                        new LineItem { Id = 5, InvoiceId = 2, Quantity = 2, Rate = 120, Task = "Helmet" },                        
                    }
                },
                new Invoice
                {
                    Id = 3,
                    CustomerName = "Apple Computer",
                    InvoiceDate = DateTime.Now.AddDays(-1),
                    LineItems = new List<LineItem>
                    {
                        new LineItem { Id = 6, InvoiceId = 3, Quantity = 2, Rate = 6000, Task = "PowerMac" },
                        new LineItem { Id = 7, InvoiceId = 3, Quantity = 5, Rate = 800, Task = "iPhone 5" },                        
                        new LineItem { Id = 8, InvoiceId = 3, Quantity = 3, Rate = 3000, Task = "MacBook Pro Retina" },                        
                    }
                },
                new Invoice
                {
                    Id = 4,
                    CustomerName = "Lowes",
                    InvoiceDate = DateTime.Now.AddDays(-1),
                    LineItems = new List<LineItem>
                    {
                        new LineItem { Id = 9, InvoiceId = 4, Quantity = 30, Rate = 50, Task = "Grass Seed" },
                        new LineItem { Id = 10, InvoiceId = 4, Quantity = 5, Rate = 20, Task = "Sprinklers" }                                                                        
                    }
                },
            };

            return invoiceList;
        }
    }
}