import { fetchUsersIfNeeded } from '../containers/Home/action'
import { fetchUserIfNeeded } from '../containers/UserInfo/action'
import NotFound from '../containers/NotFound'

// Routes
// For Development only
// import * as RouteMap from './static'

// This is used in production for code splitting via `wepback.config.server.js`
import * as RouteMap from './async.js'

export default [{
  path: '/',
  exact: true,
  component: RouteMap.Home,  // Add your route here
  loadData: dispatch => Promise.all([
    dispatch(fetchUsersIfNeeded()) // Register your server-side call action(s) here
  ])
}, {
  path: '/userinfo/:id',
  component: RouteMap.UserInfo,
  exact: true,
  loadData: (dispatch, params) => Promise.all([
    dispatch(fetchUserIfNeeded(params.id))
  ])
}, {
  path: '*',
  component: NotFound
}]
