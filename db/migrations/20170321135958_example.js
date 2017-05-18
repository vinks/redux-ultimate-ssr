'use strict'

exports.up = function(knex) {
  return knex.schema
    .createTable('example', table => {
      table.increments()
      table.string('name').notNullable()
      table.string('email').notNullable()
      table.string('phone').notNullable()
      table.string('website').notNullable()
      table.timestamps(true, true)
    })
}

exports.down = function(knex) {
  return knex.schema.dropTable('example')
}
