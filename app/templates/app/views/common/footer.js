var Magix = require('magix')

module.exports = Magix.View.extend({
  tmpl: '@footer.html',
  render: function() {
    var me = this;
    $.ajax({
        url: 'http://www.taobao.com/go/rgn/mm/footer.php',
        dataType: 'jsonp',
        data: {
          mode: 'simple'
        }
      })
      .done(function(html) {
        me.data = {
          html: _.unescape(html)
        }
        me.setView()
      })
  }
})
