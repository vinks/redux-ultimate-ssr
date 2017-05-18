import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar'

import home from '../containers/Home/reducer'
import userInfo from '../containers/UserInfo/reducer'

export default combineReducers({
  home,
  userInfo,
  router,
  loadingBar
})
