import { fetchUsersIfNeeded } from './containers/Home/action'
import { fetchUserIfNeeded } from './containers/UserInfo/action'
import HomePage from './containers/Home'
import UserInfoPage from './containers/UserInfo'
import NotFoundPage from './containers/NotFound'

// Hook for server
if (typeof require.ensure !== 'function') {
  require.ensure = function(dependencies, callback) {
    callback(require)
  }
}

export default [{
  path: '/',
  exact: true,
  component: HomePage,  // Add your route here
  loadData: dispatch => Promise.all([
    dispatch(fetchUsersIfNeeded()) // Register your server-side call action(s) here
  ])
}, {
  path: '/userinfo/:id',
  component: UserInfoPage,
  loadData: (dispatch, params) => Promise.all([
    dispatch(fetchUserIfNeeded(params.id))
  ])
}, {
  path: '*',
  component: NotFoundPage
}]
