App.views.InvoiceRowView = Backbone.View.extend({  
  tagName: 'tr',
  template: _.template($('#invoice-row-template').html()),

  events: {
    'click .btn.edit' : 'editClicked'
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  
  editClicked: function () {
    App.trigger('navigate', 'Invoices/' + this.model.id);
  }
});