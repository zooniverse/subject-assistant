const express = require('express')
const request = require('request')  // Note: superagent doesn't work well in this scenario.

const server = express()

const config = {
  origin: process.env.ORIGIN || 'http://local.zooniverse.org:3000',
  port: process.env.PORT || 3666,
}

server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', config.origin)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Credentials', 'true')
  next();
});

function proxyGet (req, res) {
  const url = req.query.url
  
  if (!url) {
    
    res.send('No URL specified')
    
  } else {
    
    request(url, function (proxyErr, proxyRes, proxyBody) {
      // Note: proxyBody is the parsed data.
      // proxyRes.body is unparsed.
      
      // TODO: handle errors, etc
    
      res.send(proxyRes.body)
    });
  }
}

server.get('*', proxyGet)

server.listen(config.port, (err) => {
  if (err) throw err
  console.log(`Proxy Server running at port ${config.port}`)
  console.log(`Acceptable origin: ${config.origin}`)
})
