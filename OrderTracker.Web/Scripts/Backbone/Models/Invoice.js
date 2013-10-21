App.models.Invoice = Backbone.Model.extend({
  initialize: function (atts, options) {
    this.lineItems = new App.collections.LineItemCollection(atts.LineItems, { invoice: this });
    this.listenTo(this.lineItems, 'change:Total', this.setInvoiceTotal);
    this.setInvoiceTotal();
  },

  idAttribute: 'Id',

  setInvoiceTotal: function () {
    this.set('InvoiceTotal', this.lineItems.calculateTotal());
  },
  
  parse: function (response, options) {
    return _.omit(response, 'LineItems');
  },
});