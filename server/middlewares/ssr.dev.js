import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { matchRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import routes from '../../client/routes'
import Html from '../markup/Html'
import { store } from '../../client/misc'

export default function(req, res) {
  // We need require app in each request for hot server updates
  const App = require('../../client/layouts/App').default

  webpackIsomorphicTools.refresh()

  const renderHtml = (store, appString) => {
    const html = renderToStaticMarkup(
      <Html
        store={store}
        appString={appString}
      />
    )

    return `<!doctype html>${html}`
  }

  // If __DISABLE_SSR__ = true, disable server side rendering
  if (__DISABLE_SSR__) {
    res.send(renderHtml(store))

    return
  }

  // Load data on server-side
  const loadBranchData = () => {
    const branch = matchRoutes(routes, req.url)

    const promises = branch.map(({ route, match }) => {
      // Dispatch the action(s) through the loadData method of "./routes.js"
      if (route.loadData) {
        return route.loadData(store.dispatch, match.params)
      }

      return Promise.resolve(null)
    })

    return Promise.all(promises)
  }

  // Send response after all the action(s) are dispathed
  loadBranchData()
    .then(() => {
      // Setup React-Router server-side rendering
      const routerContext = {}

      const app = (
        <Provider store={store}>
          <StaticRouter location={req.url} context={routerContext}>
            <App />
          </StaticRouter>
        </Provider>
      )

      // Check if the render result contains a redirect, if so we need to set
      // the specific status and redirect header and end the response
      if (routerContext.url) {
        res.status(301).setHeader('Location', routerContext.url)
        res.end()

        return
      }

      // Checking is page is 404
      const status = routerContext.status === '404' ? 404 : 200

      // We can now render our app
      const appString = renderToString(app)

      // Pass the route and initial state into html template
      res.status(status).send(renderHtml(store, appString))
    })
    .catch(err => {
      res.status(404).send('Not Found :(')
      console.error(`==> 😭  Rendering routes error: ${err}`)
    })
}
