// vue.config.js
const path = require('path')

module.exports = {
  publicPath: './', // 处理打包后路径问题

  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  }
}

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/base.scss'),
        path.resolve(__dirname, './src/styles/layout.scss'),
        path.resolve(__dirname, './src/styles/mixin.scss')
      ]
    })
}
