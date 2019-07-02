import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

window.onload = function initialise () {
  window.app = <App />
  ReactDOM.render(window.app, document.getElementById('app'))
}