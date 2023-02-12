const express = require('express')
const fetch = require('node-fetch')
require('dotenv').config()

const server = express()

function targetsConfig() {
  let targets = process.env.TARGETS || 'http://example.com;https://www.zooniverse.org/'
  // append the Zooniverse hosted service HOST if the env var is set, else use the defaults above
  if (process.env.CAMERA_TRAPS_API_SERVICE_HOST) {
    targets = `http://${process.env.CAMERA_TRAPS_API_SERVICE_HOST};${targets}`
  }
  return targets
}

function urlForMsml() {
  // Microsofot Machine Learning Camera Traps URL
  let url = process.env.URL_FOR_MSML
  // use Zooniverse hosted service URL if the env var is set, else use the default above
  if (process.env.CAMERA_TRAPS_API_SERVICE_HOST) {
    url = `http://${process.env.CAMERA_TRAPS_API_SERVICE_HOST}${process.env.CAMERA_TRAPS_API_SERVICE_PATH}`
  }
  return url
}

const config = {
  origins: process.env.ORIGINS || 'https://localhost:3000;https://local.zooniverse.org:3000',
  targets: targetsConfig(),
  url_for_msml: urlForMsml(),
  port: process.env.PORT || 3666,
  revision: process.env.REVISION || '',
}

/*
Main server functionality
 */
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

      // We need to use fetch instead of superagent because the latter can't
      // handle streaming data (content-type: application/octent-stream)
      fetch(url)
      .then(proxyRes => {
        // We can return either .json() or .text() here to suit the data we
        // receive, but since we won't know the data type in advance, .text()
        // seems more general
        return proxyRes.text()
      })
      .then(data => {
        res
        .status(200)
        .send(data)
      })
      .catch(err => {
        throw err
      })
    }
  } catch (err) {
    const errMessage = err && err.toString() || '???'

    res
    .status(500)
    .send(`ERROR: ${errMessage}`)
  }
}

server.get('*', proxyGet)

if (NODE_ENV === 'production') {
  server.listen(config.port, (err) => {
    if (err) throw err
    console.log(`Proxy Server running at port ${config.port}`)
    console.log(`Acceptable origins: ${config.origins.split(';')}`)
    console.log(`Acceptable targets: ${config.targets.split(';')}`)
    console.log(`MS ML URL: ${config.url_for_msml}`)
  })
} else {
  const https = require('https');
  const selfsigned = require('selfsigned');
  const attrs = [{ name: 'commonName', value: 'local.zooniverse.org' }];
  const { cert, private: key } = selfsigned.generate(attrs, { days: 365 });
  https.createServer({ cert, key }, server)
    .listen(config.port, (err) => {
      if (err) throw err;
      console.log(`Proxy Server running at port ${config.port}`);
      console.log(`Acceptable origins: ${config.origins.split(';')}`);
      console.log(`Acceptable targets: ${config.targets.split(';')}`);
      console.log(`MS ML URL: ${config.url_for_msml}`);
    })
}

