import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { AsyncComponentProvider, createAsyncContext } from 'react-async-component'
import asyncBootstrapper from 'react-async-bootstrapper'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Html from '../markup/Html'
import App from '../../client/layouts/App'
import { store } from '../../client/misc'

export default function(req, res) {
  // It's possible to disable SSR, which can be useful in development mode.
  // In this case traditional client side only rendering will occur.
  if (__DISABLE_SSR__) {
    // SSR is disabled so we will return an "empty" html page and
    // rely on the client to initialize and render the react application.
    const html = renderToStaticMarkup(
      <Html store={store} />
    )

    res.status(200).send(`<!DOCTYPE html>${html}`)

    return
  }

  // Create a context for our AsyncComponentProvider.
  const asyncComponentsContext = createAsyncContext()

  // Create a context for <StaticRouter>, which will allow us to
  // query for the results of the render.
  const reactRouterContext = {}

  // Declare our React application.
  const app = (
    <AsyncComponentProvider asyncContext={asyncComponentsContext}>
      <Provider store={store}>
        <StaticRouter location={req.url} context={reactRouterContext}>
          <App />
        </StaticRouter>
      </Provider>
    </AsyncComponentProvider>
  )

  // Pass our app into the react-async-component helper so that any async
  // components are resolved for the render.
  asyncBootstrapper(app).then(() => {
    const appString = renderToString(app)

    // Generate the html response.
    const html = renderToStaticMarkup(
      <Html
        appString={appString}
        asyncState={asyncComponentsContext.getState()}
        store={store}
      />
    )

    // Check if the router context contains a redirect, if so we need to set
    // the specific status and redirect header and end the response.
    if (reactRouterContext.url) {
      res.status(302).setHeader('Location', reactRouterContext.url)
      res.end()

      return
    }

    // If the renderResult contains a "missed" match then we set a 404 code.
    // Our App component will handle the rendering of an Error404 view.
    // Otherwise everything is all good and we send a 200 OK status.
    res.status(reactRouterContext.missed ? 404 : 200)
      .send(`<!DOCTYPE html>${html}`)
  })
}
