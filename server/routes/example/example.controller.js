import Example from '../../models/example'

export const getAllExamples = function(req, res, next) {
  Example.getAll()
    .then(users => res.success(users))
    .catch(err => next(err))
}

export const getExampleById = function(req, res, next) {
  const { id } = req.params

  Example.getById(id)
    .then(user => res.success(user))
    .catch(err => next(err))
}
