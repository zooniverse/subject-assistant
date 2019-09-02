const express = require('express')
const superagent = require('superagent')

const server = express()

const config = {
  port: process.env.PORT || 3666,
}

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
})
