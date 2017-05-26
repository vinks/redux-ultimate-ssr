import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { store, history } from './misc'

const mountNode = document.getElementById('react-view')

const renderApp = () => {
  const App = require('./layouts/App').default

  render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    mountNode
  )
}

// Enable hot reload by react-hot-loader
if (module.hot) {
  const reRenderApp = () => {
    try {
      renderApp()
    } catch (error) {
      const RedBox = require('redbox-react').default

      render(<RedBox error={error} />, mountNode)
    }
  }

  module.hot.accept('./layouts/App', () => {
    setImmediate(() => {
      // Preventing the hot reloading error from react-router
      unmountComponentAtNode(mountNode)
      reRenderApp()
    })
  })
}

renderApp()
