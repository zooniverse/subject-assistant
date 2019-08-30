const express = require('express')
const superagent = require('superagent')

const server = express()

const config = {
  port: 3666,
  targetServer: 'https://shaunanoordin.com',
}

function getQueryString (queryObject) {
  const str = Object
  .keys(queryObject).map((key) => {
    const val = encodeURIComponent(queryObject[key])
    return `${key}=${val}`
  })
  .join('&')
  return (str.length > 0)
    ? `?${str}`
    : str
}

function proxyGet (req, res) {
  const query = getQueryString(req.query)
  const path = req.path
  
  //console.log(res)
  res.send(`Path: ${path}${query}` )
}

server.get('*', proxyGet)

server.listen(config.port, (err) => {
  if (err) throw err
  console.log(`Proxy Server running at port ${config.port}`)
})
