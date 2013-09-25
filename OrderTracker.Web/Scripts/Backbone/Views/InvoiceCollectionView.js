App.views.InvoiceCollectionView = Backbone.View.extend({
  initialize: function () {
    this.invoiceViews = [];
    this.listenTo(this.collection, 'reset', this.renderInvoices);
  },

  template: $('#invoice-collection-template').html(),

  render: function () {
    this.$el.html(this.template);
    this.renderInvoices();
    return this;
  },

  renderInvoices: function () {
    this.invoiceViews = [];
    var invoiceEls = [];
    this.collection.each(function(model) {
      var invoiceView = new App.views.InvoiceRowView({ model: model });
      this.invoiceViews.push(invoiceView);
      invoiceEls.push(invoiceView.render().el);
    }, this);
    this.$('tbody').html(invoiceEls);
  },
  
  close: function() {
    for (var i = 0, len = this.invoiceViews.length; i < len; i++) {
      this.invoiceViews[i].remove();
    }
    this.invoiceViews = [];
  }
});