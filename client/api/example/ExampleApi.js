export default class ExampleApi {
  constructor(apiCore) {
    this.API = apiCore
    this.path = 'https://jsonplaceholder.typicode.com/users'
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
