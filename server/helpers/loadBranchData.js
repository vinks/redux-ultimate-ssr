import { matchRoutes } from 'react-router-config'

export default (store, routes, url) => {
  const branch = matchRoutes(routes, url)

  const promises = branch.map(({ route, match }) => {
    // Dispatch the action(s) through the loadData method of "./routes.js"
    if (route.loadData) {
      return route.loadData(store.dispatch, match.params)
    }

    return Promise.resolve(null)
  })

  return Promise.all(promises)
}
