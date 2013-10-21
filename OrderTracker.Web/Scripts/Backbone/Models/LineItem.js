App.models.LineItem = Backbone.Model.extend({
  initialize: function (atts, options) {
    this.calculateTotal();
    this.on('change:Rate change:Quantity', this.calculateTotal);
  },

  calculateTotal: function() {
    this.set('Total', this.get('Rate') * this.get('Quantity'));
  }
});