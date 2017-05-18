'use strict'

exports.seed = function(knex) {
  return knex('example').del()
    .then(() => knex.raw("SELECT setval('example_id_seq', 1, false);"))
    .then(() => knex('example')
      .insert([
        { name: 'John', email: 'Sincere@april.biz', phone: '1-770-736-8031 x56442', website: 'hildegard.org' },
        { name: 'Paul', email: 'Sincere@april.biz', phone: '1-770-736-8031 x56442', website: 'hildegard.org' },
        { name: 'George', email: 'Sincere@april.biz', phone: '1-770-736-8031 x56442', website: 'hildegard.org' },
        { name: 'Ringo', email: 'Sincere@april.biz', phone: '1-770-736-8031 x56442', website: 'hildegard.org' }
      ])
      .returning('*'))
    .then(() => knex.raw(
      "SELECT setval('example_id_seq', (select max(id) from example));"
    ))
}
