import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

import Form from './Form'
import Home from './Home'
import Header from './Header'
import MLTaskManager from './MLTaskManager'

class App extends React.Component {
  constructor () {
    super()
  }
  
  render () {
    return (
      <Router>
        <>
          <Header />
          <main>
            <Route path="/" exact component={Home} />
            <Route path="/form" component={Form} />
            <Route path="/tasks" component={MLTaskManager} />
          </main>
          <footer>Footer</footer>
        </>
      </Router>
    )
  }
}

export default App
