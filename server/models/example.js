import { Model } from '../../orm'

class Example extends Model {

  static get tableName() {
    return 'example'
  }

  static get idColumn() {
    return 'id'
  }

}

Example.getAll = () => Example.query()

Example.getById = id => Example.query()
  .where('id', id)
  .first()

export default Example
