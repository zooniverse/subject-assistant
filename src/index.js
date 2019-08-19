import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

import indexHtml from './html/index.html'
import indexCss from './styles/index.scss'

import oauth from 'panoptes-client/lib/oauth'
import config from '@config'


window.onload = function initialise () {
  window.app = <App />
  
  oauth.init(config.panoptesAppId)
  .then(() => {
    ReactDOM.render(window.app, document.getElementById('app'))
  })
}
