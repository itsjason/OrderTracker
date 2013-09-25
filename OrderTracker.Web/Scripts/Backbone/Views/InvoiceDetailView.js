App.views.InvoiceDetailView = Backbone.View.extend({
  template: _.template($('#invoice-detail-template').html()),

  initialize: function() {
    this.lineItemViews = [];
  },

  events: {
    'click .btn.invoice-list': 'navigateToInvoiceList'
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  navigateToInvoiceList: function () {
    App.trigger('navigate', '/');
  },

  close: function() {
    this.remove();
  }
});