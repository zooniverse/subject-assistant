import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

import ConfigForm from './ConfigForm'
import Home from './Home'
import Header from './Header'
import MLTaskManager from './MLTaskManager'
import TestForm from './TestForm'

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
            <Route path="/tasks" component={MLTaskManager} />
            <Route path="/config" component={ConfigForm} />
            <Route path="/test" component={TestForm} />
          </main>
          <footer>Footer</footer>
        </>
      </Router>
    )
  }
}

export default App
