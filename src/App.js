import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'

import { AppStore  } from './store/AppStore.js'
import { AppContext } from './store/AppContext'
import Header from './Header'
import Form from './Form'

const Home = () => <div><Link to="/form">Form</Link></div>

class App extends React.Component {
  constructor () {
    super()
  }
  
  render () {
    return (
      <>
        <Header />
        <main>
          <Router>
            <Route path="/" exact component={Home} />
            <Route path="/form" component={Form} />
          </Router>
        </main>
        <footer>Footer</footer>
      </>
    )
  }
}

export default App
