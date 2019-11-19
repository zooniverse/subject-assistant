import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { observer } from 'mobx-react'
import AppContext from '@store'
import { ASYNC_STATES } from '@util'

import ConfigForm from './ConfigForm'
import Home from './Home'
import Header from './Header'
import MLTaskManager from './MLTaskManager'
import Status401 from './Status401'

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
    const user = this.context.auth.user
    
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
                <Switch>
                  <Route path="/" exact>
                    <Home />
                  </Route>
                  <Route path="/tasks/:task_id">
                    {(user)
                      ? <MLTaskManager />
                      : <Status401 />
                    }
                  </Route>
                  <Route path="/tasks">
                    {(user)
                      ? <MLTaskManager />
                      : <Status401 />
                    }
                  </Route>
                  <Route path="/config" exact>
                    <ConfigForm />
                  </Route>
                </Switch>
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
