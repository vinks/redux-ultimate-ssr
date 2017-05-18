import { Model } from '../../orm'

class Example extends Model {

  static get tableName() {
    return 'example'
  }

  static get idColumn() {
    return 'id'
  }

}

Example.getAll = function() {
  return this.query()
}

Example.getById = function(id) {
  return this.query()
    .where('id', id)
    .first()
}

export default Example
