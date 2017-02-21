var Magix = require('magix')
var Router = Magix.Router
var CommonMenu = require('../common/menu')

var TABS = [{
  icon: '&#xe613;',
  key: 'liveroom',
  label: '直播间'
}, {
  icon: '&#xe682;',
  key: 'realtime',
  label: '账户实时监控'
}]

module.exports = CommonMenu.extend({
  tmpl: '@menu.html',
  render: function() {
    var me = this
    var path = Router.parse().path
    var tab = path.split('/')[2] || 'liveroom'

    _.extend(me.data, {
      current: tab,
      tabs: TABS
    })
    me.setView()
    me.setInitialState()
  },
  'toggleTab<click>': function(e) {
    var curNode = $(e.currentTarget)

    if (curNode.hasClass('active')) {
      return
    }
    Router.to('/home/' + e.params + '/index')
  }
})
