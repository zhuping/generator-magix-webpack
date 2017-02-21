var Magix = require('magix')

var DEFAULT = {
  ajaxSetting: {
    method: 'GET',
    dataType: 'json'
  }
}

var Service = Magix.Service.extend(function(bag, callback) {

  var ajaxSetting = DEFAULT.ajaxSetting
  var params = bag.get('params') || bag.get('formParams') || bag.get('urlParams') || {}
  var url = bag.get('url')
  var async = bag.get('async')
  var method = bag.get('method') || ajaxSetting.method
  var dataType = bag.get('dataType') || ajaxSetting.dataType
  var paramsStrArr = []

  async = async === false ? false : true

  var ctoken = Magix.config().ctoken
  $.extend(params, {
    t: (+new Date()),
    ctoken: ctoken
  })

  if (typeof params === 'object') {
    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        if (typeof params[key] === 'object') {
          paramsStrArr.push(key + '=' + encodeURIComponent(JSON.stringify(params[key])))
        } else {
          paramsStrArr.push(key + '=' + encodeURIComponent(params[key]))
        }

      }
    }
    params = paramsStrArr.join('&')
  }

  $.ajax({
    url: Magix.toUrl(url),
    dataType: dataType,
    timeout: 20000,
    data: params,
    type: method,
    async: async,
    complete: function(xhr, text) {
      var resp = $.parseJSON(xhr.responseText)
      if (resp.success) {
        bag.set('data', resp.data)
        callback()
      }
    }
  })
})

module.exports = Service
