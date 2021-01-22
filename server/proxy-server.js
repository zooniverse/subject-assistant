const express = require('express')
const request = require('request')  // Note: superagent doesn't work well in this scenario.
require('dotenv').config()

const server = express()

const config = {
  origins: process.env.ORIGINS || 'http://localhost:3000;http://local.zooniverse.org:3000',
  targets: process.env.TARGETS || 'http://example.com;https://www.zooniverse.org/',
  url_for_msml: process.env.URL_FOR_MSML || '',  // Microsofot Machine Learning
  port: process.env.PORT || 3666,
  revision: process.env.REVISION || '',
}

server.use(function (req, res, next) {
  const origin = req.get('origin') || ''
  const acceptableOrigins = config.origins.split(';')
  const originIsAcceptable = acceptableOrigins.find(function (target) {
    return origin.toLowerCase() === target.toLowerCase()
  })

  if (originIsAcceptable) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Credentials', 'true')
  }

  next();
});

function proxyGet (req, res) {
  try {
    let url = req.query.url || ''
    const predefined_target = req.query.target || ''

    switch (predefined_target) {
      case 'msml':
        url = `${config.url_for_msml}${url}`
        break
    }

    const acceptableTargets = config.targets.split(';')
    const urlIsAcceptable = acceptableTargets.find(function (target) {
      return url.toLowerCase().startsWith(target.toLowerCase())
    })

    if (url.length === 0) {
      // default route
      res.json({
        'revision': config.revision,
        'usage': 'Please supply either a ?url=$URL or ?target=msml query param'
      });

    } else if (!urlIsAcceptable) {

      res
        .status(422)
        .json({'error': 'Target URL is not in the whitelist'});

    } else {

      request(url, function (proxyErr, proxyRes) {
        // Note: proxyRes.body is unparsed data.

        let status = (proxyRes && proxyRes.statusCode) || 500
        let statusMessage = (proxyRes && proxyRes.statusMessage) || 'No data'
        let data = (proxyRes && proxyRes.body) || `ERROR: ${statusMessage}`

        if (proxyErr) {
          status = 500
          data = proxyErr.toString()
        }

        res
          .status(status)
          .send(data)

      });
    }
  } catch (err) {
    const errMessage = err && err.toString() || '???'

    res
      .status(500)
      .send(`ERROR: ${errMessage}`)
  }
}

server.get('*', proxyGet)

server.listen(config.port, (err) => {
  if (err) throw err
  console.log(`Proxy Server running at port ${config.port}`)
  console.log(`Acceptable origins: ${config.origins.split(';')}`)
  console.log(`Acceptable targets: ${config.targets.split(';')}`)
})
