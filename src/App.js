import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'

import { APP_CONTEXT } from './store/AppContext'
import AppStore from './store/AppStore'
import Form from './Form'

const Home = () => <div><Link to="/form">Form</Link></div>

class App extends React.Component {
  constructor () {
    super()
    
    this.store = AppStore.create({
      name: 'Shaun',
      job: 'wizard',
    })
  }
  
  render () {
    return (
      <>
        <header>Zooniverse ML Subject Assistant</header>
        <main>
          <h1>Hello World</h1>
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
