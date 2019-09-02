const express = require('express')
const superagent = require('superagent')

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
    
    superagent.get(url)
    .then(proxyRes => {
      res
      .type(proxyRes.type)
      .send(proxyRes.text)
    })
    
  }
}

server.get('*', proxyGet)

server.listen(config.port, (err) => {
  if (err) throw err
  console.log(`Proxy Server running at port ${config.port}`)
  console.log(`Acceptable origin: ${config.origin}`)
})
