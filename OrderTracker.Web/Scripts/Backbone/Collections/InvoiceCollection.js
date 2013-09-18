App.collections.InvoiceCollection = Backbone.Collection.extend({  
  model: App.models.Invoice,
  
  url: '/api/invoices'
});