const chalk = require('chalk')
const { highlight } = require('cli-highlight')

const colored = function(fn) {
  return function() {
    const enabled = chalk.enabled

    chalk.enabled = true
    fn.apply(this, arguments)
    chalk.enabled = enabled
  }
}

module.exports = function(knex) {
  return function(req, res, next) {
    const queries = []
    const captureQueries = function(builder) {
      const startTime = process.hrtime()
      const group = [] // Captured for this builder

      builder.on('query', query => {
        group.push(query)
        queries.push(query)
      })

      builder.on('end', () => {
        // All queries are completed at this point.
        // in the future, it'd be good to separate out each individual query,
        // but for now, this isn't something that knex supports. see the
        // discussion here for details:
        // https://github.com/tgriesser/knex/pull/335#issuecomment-46787879
        const diff = process.hrtime(startTime)
        const ms = diff[0] * 1e3 + diff[1] * 1e-6

        group.forEach(query => {
          query.duration = ms.toFixed(3)
        })
      })
    }

    const logQueries = colored(() => {
      res.removeListener('finish', logQueries)
      res.removeListener('close', logQueries)
      knex.client.removeListener('start', captureQueries)

      queries.forEach(query => {
        const sqlLog = knex.raw(query.sql, query.bindings).toString()

        console.log('%s %s %s %s',
          chalk.gray('SQL'),
          highlight(sqlLog, { language: 'sql', ignoreIllegals: true }),
          chalk.gray(' --- '),
          chalk.magenta(`${query.duration} ms`))
      })
    })

    knex.client.on('start', captureQueries)
    res.on('finish', logQueries)
    res.on('close', logQueries)

    next()
  }
}
