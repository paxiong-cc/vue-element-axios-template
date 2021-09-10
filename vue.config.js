// vue.config.js
const path = require('path')

module.exports = {
  lintOnSave: false,
  publicPath: './', // 处理打包后路径问题

  devServer: {
    host: "0.0.0.0",
    port: 8080,
    // 设置代理
    proxy: {
        "/v2": {
            target: "https://web.seduclive.com/api/", // 李科域名
            ws: true, // 是否启用websockets
            changeOrigin: true,
            pathRewrite: {
                "^/v2": "/",
            },
        },
    },
    overlay: {
        warning: false,
        errors: false,
    },
  },

  productionSourceMap: false,

  // 全局注入css
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  },

  configureWebpack: (config) => {
    config.entry.app = ["babel-polyfill", "./src/main.js"];
    config.externals = {
        echarts: "echarts",
    };

    if (process.env.NODE_ENV === 'production') {
        config.optimization = {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            drop_console: true,
                        },
                    },
                }),
            ],
        }
    }
    const CompressionWebpackPlugin = require('compression-webpack-plugin')
    config.plugins.push(
      new CompressionWebpackPlugin({
      test: /\.js$|\.html$|\.css$/,
      // 超过4kb压缩
      threshold: 4096,
      deleteOriginalAssets: false
      })
    )
  },

  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px2rem-exclude')({
            remUnit: 192
            // exclude: /home/i // 排除首屏
          })
        ]
      }
    }
  },
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
