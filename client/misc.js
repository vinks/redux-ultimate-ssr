import createMemoryHistory from 'history/createMemoryHistory'
import createBrowserHistory from 'history/createBrowserHistory'
import configureStore from './redux/store'

const initialState = __CLIENT__ ? window.__INITIAL_STATE__ : {}

export const history = __CLIENT__ ? createBrowserHistory() : createMemoryHistory()
export const store = configureStore(history, initialState)
