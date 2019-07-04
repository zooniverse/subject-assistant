import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

const ComponentX = () => <div>X</div>
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
            <Route path="/x" component={ComponentX} />
            <Route path="/y" component={ComponentY} />
            <Route path="/z" component={ComponentZ} />
          </Router>
        </main>
        <footer>Footer</footer>
      </>
    )
  }
}

export default App
