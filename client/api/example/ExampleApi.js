import config from '../../config'

export default class ExampleApi {
  constructor(apiCore) {
    this.API = apiCore
    this.path = `${config.apiUrl}/example`
  }

  setPath(path) {
    this.path = path
  }

  getUsers() {
    return this.API.get(this.path)
  }

  getUser(id) {
    return this.API.get(`${this.path}/${id}`)
  }
}
