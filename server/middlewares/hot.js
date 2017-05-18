const path = require('path')
const chokidar = require('chokidar')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../../tools/webpack/webpack.client.babel')

const compiler = webpack(webpackConfig)

module.exports = app => {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    noInfo: true,
    stats: 'minimal'
  }))

  app.use(webpackHotMiddleware(compiler))

  // Do "hot-reloading" of express stuff on the server
  // Throw away cached modules and re-require next time
  // Ensure there's no important state in there!
  const watchDir = path.join(__dirname, '../../server')
  const watcher = chokidar.watch(watchDir)

  console.info(`Watch directory for changes ${watchDir}`)

  watcher.on('ready', () => {
    watcher.on('all', () => {
      console.info('Clearing /server/ module cache from server')

      Object.keys(require.cache).forEach(id => {
        if (/[/\\]server[/\\]/.test(id)) {
          delete require.cache[id]
        }
      })
    })
  })

  // Do "hot-reloading" of react stuff on the server
  // Throw away the cached client modules and let them be re-required next time
  compiler.plugin('done', () => {
    console.info('Clearing /client/ module cache from server')

    Object.keys(require.cache).forEach(id => {
      if (/[\/\\]client[\/\\]/.test(id)) {
        delete require.cache[id]
      }
    })
  })
}
