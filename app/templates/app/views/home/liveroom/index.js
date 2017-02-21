var Magix = require('magix')
var HomeModel = require('homemodel')

module.exports = Magix.View.extend({
  tmpl: '@index.html',
  render: function() {
    var me = this

    me.wrapModel(HomeModel).getReviewTask({
      page: 1,
      pageSize: 10
    }, function(data) {
      me.data = {
        list: data.list,
        minPager: data.minPager
      }

      me.setView()
    })
  }
})
