App.views.InvoiceRowView = Backbone.View.extend({  
  tagName: 'tr',
  template: _.template($('#invoice-row-template').html()),

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});