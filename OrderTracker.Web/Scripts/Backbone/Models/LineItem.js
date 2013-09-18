App.models.LineItem = Backbone.Model.extend({
  initialize: function (atts, options) {
    this.calculateTotal();
  },

  calculateTotal: function() {
    this.set('Total', this.get('Rate') * this.get('Quantity'));
  }
});