import path from 'path'
import morgan from 'morgan'
import chalk from 'chalk'
import express from 'express'
import helmet from 'helmet'
import hpp from 'hpp'
import compression from 'compression'
import favicon from 'serve-favicon'

import jsend from './middlewares/jsend'
import ssr from './middlewares/ssr'
import ssrDev from './middlewares/ssr.dev'
import { port, host } from './config'
import routes from './routes'

const app = express()

app.use(jsend())

// Using helmet to secure Express with various HTTP headers
app.use(helmet())

// Prevent HTTP parameter pollution.
app.use(hpp())

// Compress all requests
app.use(compression())

// Use morgan for http request debug (only show error)
app.use(morgan('dev', { skip: (req, res) => res.statusCode < 400 }))

// Express handle favicon
app.use(favicon(path.join(process.cwd(), './build/public/favicon.ico')))

// Express handle static
app.use(express.static(path.join(process.cwd(), './build/public')))

// Run express as webpack dev server
if (__DEV__) {
  const hotServer = require('./middlewares/hot')
  const { knex } = require('../orm')
  const knexLogger = require('./middlewares/knex-logger')

  hotServer(app)

  app.use(knexLogger(knex))

  // Include server routes as a middleware
  app.use('/api', (req, res, next) => {
    require('./routes').default(req, res, next)
  })

  app.use(ssrDev)
} else {
  app.use(routes)
  app.use(ssr)
}

if (port) {
  app.listen(port, host, err => {
    if (err) {
      console.error(`==> 😭  OMG!!! ${err}`)
    }

    console.info(chalk.green(`==> 🌎  Listening at http://${host}:${port}`))

    // Open Chrome
    require('../tools/openBrowser').default(port)
  })
} else {
  console.error(chalk.red('==> 😭  OMG!!! No PORT environment variable has been specified'))
}
