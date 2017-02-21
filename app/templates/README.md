# 基于webpack的Magix脚手架

只适用于基于 `Maigx3.0` 的项目工程。目前只是一个基本的脚手架，还有很多优化的点，也缺少线上项目的有利验证，希望可以通过更多的实践来不断完善。

### 优点
- 不再需要第三方的模块加载框架requireJs或seaJs等
- 支持AMD、CommonJS和ES6 module等模块规范
- 静态资源模块化，包括JS、CSS、HTML、图片及字体等
- 像写node一样写前端代码（require、module.exports）

### 不足
- 打包性能还可以再优化，包括公共代码的提取（通用组件、工具类等），多线程代码构建（使用happypack）
- 不支持 `brix` 组件库引入

### 运行

`npm run dev`

### 打包

`npm run build`
