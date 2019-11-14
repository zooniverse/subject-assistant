import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { observer } from 'mobx-react'
import AppContext from '@store'
import { ASYNC_STATES } from '@util'

import ConfigForm from './ConfigForm'
import Home from './Home'
import Header from './Header'
import MLTaskManager from './MLTaskManager'

import demoDataForTask from '@demo-data/task.txt'
import demoDataForResults from '@demo-data/detections.txt'

class App extends React.Component {
  constructor () {
    super()
  }
  
  componentDidMount () {
    this.initialise()
  }
  
  initialise () {
    this.context.auth.initialise()
  }
  
  render () {
    const initialised = this.context.auth.status === ASYNC_STATES.SUCCESS
    
    return (
      <Router>
        <>
          <Header />
          {(!initialised)
            ?
              <main>
                <div className="status box">Loading</div>
              </main>
            :
              <main>
                <Route path="/" exact component={Home} />
                <Route path="/tasks" component={MLTaskManager} />
                <Route path="/config" component={ConfigForm} />
              </main>
          }
          <footer>v1.0</footer>
        </>
      </Router>
    )
  }
}

App.contextType = AppContext

export default observer(App)
