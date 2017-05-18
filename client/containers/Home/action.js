export const USERS_INVALID = 'USERS_INVALID'
export const USERS_REQUESTING = 'USERS_REQUESTING'
export const USERS_FAILURE = 'USERS_FAILURE'
export const USERS_SUCCESS = 'USERS_SUCCESS'

// Export this for unit testing more easily
export const fetchUsers = axios =>
  dispatch => {
    dispatch({ type: USERS_REQUESTING })

    return axios.exampleApi.getUsers()
      .then(data => {
        dispatch({ type: USERS_SUCCESS, data })
      })
      .catch(err => {
        dispatch({ type: USERS_FAILURE, err })
      })
  }

// Preventing dobule fetching data
const shouldFetchUsers = state => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) {
    return true
  }

  const home = state.home

  if (home.readyStatus === USERS_SUCCESS) {
    return false // Preventing double fetching data
  }

  return true
}

export const fetchUsersIfNeeded = () =>
  (dispatch, getState, axios) => {
    if (shouldFetchUsers(getState())) {
      return dispatch(fetchUsers(axios))
    }

    return null
  }
