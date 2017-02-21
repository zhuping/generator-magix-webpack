var Magix = require('magix')

module.exports = Magix.View.extend({
  tmpl: '@404.html',
  render: function() {
    this.setView()
  },
  'goBack<click>': function(e) {
    e.preventDefault()
    history.back()
  }
})
