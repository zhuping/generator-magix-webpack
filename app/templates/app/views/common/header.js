var Magix = require('magix')
var Router = Magix.Router

var EMPTY = ''
var MENU = [{
  key: 'home',
  path: '/home/liveroom/index',
  text: '数据监控'
}, {
  key: 'blacklist',
  path: '/blacklist/index',
  text: '黑名单处理'
}]

module.exports = Magix.View.extend({
  tmpl: '@header.html',
  ctor: function() {
    this.observe({
      path: true
    })
  },
  render: function() {
    var me = this
    var menuList = $.extend(true, [], MENU)
    var path = Router.parse().path || EMPTY
    var i, menu
    for (i = 0;
      (menu = menuList[i]) !== undefined; i++) {
      if (path.indexOf('/' + menu.key) > -1) {
        menu.active = true
        break
      }
    }

    if (!menu) {
      menuList[0].active = true
    }

    me.data = {
      menuList: menuList
    }

    me.setView()
  }
})
