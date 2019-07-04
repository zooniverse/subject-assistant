import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'

import Form from './Form'

const Home = () => <div><Link to="/form">Form</Link></div>
const ComponentY = () => <div>Y</div>
const ComponentZ = () => <div>Z</div>

class App extends React.Component {
  constructor () {
    super()
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
