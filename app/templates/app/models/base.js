var Class = (function() {
  var _mix = function(r, s) {
    for (var p in s) {
      if (s.hasOwnProperty(p)) {
        r[p] = s[p]
      }
    }
  }

  var _extend = function() {

    // 开关 用来使生成原型时,不调用真正的构成流程init
    this.initPrototype = true
    var prototype = new this()
    this.initPrototype = false

    var items = Array.prototype.slice.call(arguments) || []
    var item = items.shift()

    // 支持混入多个属性，并且支持{}也支持 Function
    while (item) {
      _mix(prototype, item.prototype || item)
      item = items.shift()
    }

    // 这边是返回的类，其实就是我们返回的子类
    function SubClass() {
      // if (!this instanceof Class) return new arguments.callee()

      if (!SubClass.initPrototype && this.init) {
        this.init.apply(this, arguments) // 调用init真正的构造函数
      }
    }

    // 赋值原型链，完成继承
    SubClass.prototype = prototype

    // 改变constructor引用
    SubClass.prototype.constructor = SubClass

    // 为子类也添加extend方法
    SubClass.extend = _extend

    return SubClass
  }
    // 超级父类
  var Class = function() {}
    // 为超级父类添加extend方法
  Class.extend = _extend

  return Class
})()

var BASE = Class.extend({
  init: function(view) {
    this._view = view
    this._request = view.request()
  },
  fetchAll: function(models, done) {
    this._request.all(models, done)
  },
  save: function(models, done) {
    this._request.save(models, done)
  }
})

module.exports = BASE
