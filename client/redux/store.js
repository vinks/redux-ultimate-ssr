import { routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import api from '../api'

import rootReducer from './reducers'

export default (history, initialState = {}) => {
  const middlewares = [
    thunk.withExtraArgument(api),
    routerMiddleware(history)
  ]

  if (__DEV__ && __CLIENT__) {
    const logger = require('redux-logger').default
    const perflogger = require('redux-perf-middleware').default

    middlewares.push(logger, perflogger)
  }

  const enhancers = [
    applyMiddleware(...middlewares),
    __DEV__ && typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ?
      window.devToolsExtension() : f => f
  ]

  const store = createStore(rootReducer, initialState, compose(...enhancers))

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      try {
        const nextReducer = require('./reducers').default

        store.replaceReducer(nextReducer)
      } catch (error) {
        console.error('😭  Reducer hot reloading error', error)
      }
    })
  }

  return store
}
