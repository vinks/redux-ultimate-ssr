const _ = require('lodash')

const defaultConfig = require('./default')

// Over write default settings here...
module.exports = _.merge({}, defaultConfig, {
  apiUrl: 'http://localhost:8080/api'
})
