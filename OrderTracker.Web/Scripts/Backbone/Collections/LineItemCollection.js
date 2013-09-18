App.collections.LineItemCollection = Backbone.Collection.extend({  
  model: App.models.LineItem,

  initialize: function (models, options) {
    this.invoice = options.invoice;
  },
  
  calculateTotal: function () {
    return _.inject(this.pluck('Total'), function (sum, number) { return sum + number; }, 0);
  }
});