var Base = require('../base')

module.exports = Base.extend({
  getReviewTask: function(opts, cb) {
    var me = this
    me.fetchAll([{
      name: 'get_review_task',
      params: opts
    }], function(e, MesModel) {
      var data = MesModel.get('data')
      /* jshint -W030 */
      cb && cb(data)
    })
  },
  semAccountList: function(opts, cb) {
    var me = this

    me.fetchAll([{
      name: 'sem_account_list',
      params: opts
    }], function(err, MesModel) {
      var data = MesModel.get('data')
      /* jshint -W030 */
      cb && cb(data)
    });
  }
})
