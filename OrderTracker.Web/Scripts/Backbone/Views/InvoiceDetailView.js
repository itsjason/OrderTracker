App.views.InvoiceDetailView = Backbone.View.extend({
  template: _.template($('#invoice-detail-template').html()),

  initialize: function() {
    this.lineItemViews = [];
    this.listenTo(this.model, 'change:InvoiceTotal', this.updateInvoiceTotal);
  },

  events: {
    'click .btn.invoice-list': 'navigateToInvoiceList',
    'click #save-invoice': 'saveInvoice'
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    for (var i = 0, _len = this.model.lineItems.length; i < _len; i++) {
      var lineItem = this.model.lineItems.at(i);
      var view = new App.views.LineItemView({ model: lineItem });
      this.lineItemViews.push(view);
      this.$('table tbody').prepend(view.render().el);
    }
    return this;
  },

  navigateToInvoiceList: function () {
    App.trigger('navigate', '/');
  },

  updateInvoiceTotal: function (model, value) {
    this.$('#InvoiceTotal').html(numeral(value).format('$0,0'));
  },

  saveInvoice: function () {
    this.model.set({
      CustomerName: this.$('#CustomerName').val(),
      InvoiceDate: this.$('#InvoiceDate').val()
    });
    this.model.save();
  },

  close: function() {
    for (var i = 0, len = this.lineItemViews.length; i < len; i++) {
      this.lineItemViews[i].remove();
    }
    this.remove();
  }
});