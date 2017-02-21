var Pat = require('pat')
var Magix = require('magix')

Pat.config({
  debug: UserInfo.debug ? true : false
})

Magix.boot({
  defaultView: 'app/views/default',
  unmatchView: 'app/views/common/404',
  views: {
    'app/exts': require('./exts'),
    'app/views/default': require('./views/default'),

    // 公共页面
    'app/views/common/header': require('./views/common/header'),
    'app/views/common/footer': require('./views/common/footer'),
    'app/views/common/404': function() {
      return require.ensure([], function(require) {
        return require('./views/common/404')
      })
    },

    // 首页
    'app/views/home/menu': function() {
      return require.ensure([], function(require) {
        return require('./views/home/menu')
      })
    },
    'app/views/home/liveroom/index': function() {
      return require.ensure([], function(require) {
        return require('./views/home/liveroom/index')
      })
    },
    'app/views/home/realtime/index': function() {
      return require.ensure([], function(require) {
        return require('./views/home/realtime/index')
      })
    }
  },
  routes: {
    '/home/liveroom/index': 'app/views/default',
    '/home/realtime/index': 'app/views/default'
  },
  exts: [
    'app/exts'
  ],
  error: function(e) {
    console.log(e, e.stack)
    throw e
  }
})
