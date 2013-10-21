App.views.LineItemView = Backbone.View.extend({
  template: _.template($('#line-item-template').html()),
  tagName: 'tr',

  initialize: function () {
    this.listenTo(this.model, 'change:Total', this.updateTotal);
  },

  events: {
    'keyup [name=Task]': 'onTaskChanged',
    'keyup [name=Quantity]': 'onQuantityChanged',
    'keyup [name=Rate]': 'onRateChanged'
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  
  updateTotal: function (model, value) {
    this.$('.Total').html(numeral(value).format('$0,0'));
  },
  
  onTaskChanged: function (e) {
    this.model.set('Task', $(e.target).val());
  },

  onQuantityChanged: function (e) {
    this.model.set('Quantity', Number($(e.target).val()));
  },

  onRateChanged: function (e) {
    this.model.set('Rate', Number($(e.target).val()));
  }
});