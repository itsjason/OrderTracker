App.models.Invoice = Backbone.Model.extend({
  initialize: function (atts, options) {
    this.lineItems = new App.collections.LineItemCollection(atts.LineItems, { invoice: this });
    this.set('Total', this.lineItems.calculateTotal());
  },

  idAttribute: 'Id',
  
  parse: function (response, options) {
    return _.omit(response, 'LineItems');
  },
});