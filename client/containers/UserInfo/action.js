export const USER_REQUESTING = 'USER_REQUESTING'
export const USER_FAILURE = 'USER_FAILURE'
export const USER_SUCCESS = 'USER_SUCCESS'

// Export this for unit testing more easily
export const fetchUser = (userId, axios) =>
  dispatch => {
    dispatch({ type: USER_REQUESTING, userId })

    return axios.exampleApi.getUser(userId)
      .then(data => {
        dispatch({ type: USER_SUCCESS, userId, data })
      })
      .catch(err => {
        dispatch({ type: USER_FAILURE, userId, err })
      })
  }

// Using for preventing dobule fetching data
const shouldFetchUser = (state, userId) => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) {
    return true
  }

  const userInfo = state.userInfo[userId]

  // Preventing dobule fetching data in production
  if (userInfo && userInfo.readyStatus === USER_SUCCESS) {
    return false
  }

  return true
}

export const fetchUserIfNeeded = userId =>
  (dispatch, getState, axios) => {
    if (shouldFetchUser(getState(), userId)) {
      return dispatch(fetchUser(userId, axios))
    }

    return null
  }
