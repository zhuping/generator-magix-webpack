var Service = require('./service')

Service.add([{
  name: 'get_review_task',
  url: '/review/getTaskListOfFlow'
}, {
  name: 'sem_account_list',
  url: '/semAccount/list'
}])

module.exports = Service
