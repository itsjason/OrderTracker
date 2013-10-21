App = {
  models: {},
  collections: {},
  views: {}
};

_.extend(App, Backbone.Events);

App.Router = Backbone.Router.extend({
  initialize: function() {
    this.currentView = null;
    this.container = $('.container');
    this.invoices = new App.collections.InvoiceCollection();
    this.invoices.fetch({ reset: true });
    this.listenTo(App, 'navigate', this.navigateTo);
  },
  
  routes: {
    '': 'index',
    'Invoices/:id': 'invoice',
  },

  index: function () {
    var view = new App.views.InvoiceCollectionView({ collection: this.invoices });
    this.showView(view);
  },

  invoice: function (id) {
    var invoice = this.invoices.get(id);
    var view = new App.views.InvoiceDetailView({ model: invoice });
    this.showView(view);
  },

  showView: function (newView) {
    this.closeCurrentView();
    this.currentView = newView;
    this.container.html(newView.render().el);
  },
  
  closeCurrentView: function() {
    if (!this.currentView) return;
    this.currentView.close();
    this.currentView = null;
  },
  
  navigateTo: function (fragment, options) {
    options || (options = {});
    _.defaults(options, { trigger: true });
    this.navigate(fragment, options);
  }
});