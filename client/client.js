import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { AsyncComponentProvider } from 'react-async-component'
import asyncBootstrapper from 'react-async-bootstrapper'
import { store, history } from './misc'
import App from './layouts/App'

const mountNode = document.getElementById('react-view')

// Get any "rehydrate" state sent back by the server
const rehydrateState = window.__ASYNC_COMPONENTS_STATE__

const app = (
  <AsyncComponentProvider rehydrateState={rehydrateState}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </AsyncComponentProvider>
)

asyncBootstrapper(app).then(() => {
  render(app, mountNode)
})
