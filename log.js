var bunyan = require('bunyan')

module.exports = function (config) {
  var logStreams = [
    {
      type: 'rotating-file',
      level: config.log.level,
      path: config.log.path,
      period: config.log.period,
      count: config.log.count
    },
    {
      type: 'raw',
      level: 'trace',
      stream: new bunyan.RingBuffer({ limit: 100 })
    }
  ]

  if (config.env !== 'production') {
    logStreams.push({ stream: process.stderr, level: 'trace' });
  }

  var log = bunyan.createLogger(
    {
      name: 'picl-idp',
      streams: logStreams
    }
  )

  log.info(config, "starting config")

  return log
}