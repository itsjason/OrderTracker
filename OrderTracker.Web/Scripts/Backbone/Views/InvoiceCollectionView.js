App.views.InvoiceCollectionView = Backbone.View.extend({  
  initialize: function() {
    this.listenTo(this.collection, 'reset', this.renderAll);
  },

  el: '#invoices-table',

  renderAll: function () {
    var invoices = [];
    this.collection.each(function (model) {
      invoices.push(new App.views.InvoiceRowView({ model: model }).render().el);
    });
    this.$('tbody').html(invoices);
  }
});