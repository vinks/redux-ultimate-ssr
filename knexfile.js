'use strict'

const path = require('path')

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://postgres:@localhost/exampledb_dev',
    migrations: {
      directory: path.join(__dirname, 'db/migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'db/seeds')
    },
    shemaName: 'public'
  },

  production: {
    client: 'pg',
    connection: 'postgres://postgres:@localhost/exampledb_prod',
    migrations: {
      directory: path.join(__dirname, 'db/migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'db/seeds')
    },
    shemaName: 'public'
  }
}
