require('../assets/index.less')

var Magix = require('magix')
var Router = Magix.Router

module.exports = Magix.View.extend({
  tmpl: '@default.html',
  ctor: function() {
    this.observe(null, true)
  },
  render: function() {
    var me = this
    var path = Router.parse().path

    if (path === '' || path === '/') {
      path = '/home/liveroom/index'
    }
    me.data = {
      mainView: 'app/views' + path
    }
    me.setView()
  }
})
