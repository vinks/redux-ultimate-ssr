export default class ExampleApi {
  constructor(apiCore) {
    this.API = apiCore
    this.path = 'http://localhost:3000/api/example'
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
