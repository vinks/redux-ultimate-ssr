'use strict'

const objection = require('objection')
const Model = objection.Model

const environment = process.env.NODE_ENV || 'development'
const knexConfig = require('./knexfile')[environment]

// Initialize knex connection.
const knex = require('knex')(knexConfig)

// Give the connection to objection.
Model.knex(knex)

module.exports = {
  Model,
  knex,
  shemaName: knexConfig.shemaName
}
