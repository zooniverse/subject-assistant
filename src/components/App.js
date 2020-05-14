import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { observer } from 'mobx-react'
import AppContext from '@store'
import { ASYNC_STATES } from '@util'

import Header from './Header'

import ConfigForm from './ConfigForm'
import HamletPage from './HamletPage'
import HomePage from './HomePage'
import IntroPage from './IntroPage'
import MLTaskManager from './MLTaskManager'
import Status401 from './Status401'
import Status404 from './Status404'

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
                    <HomePage />
                  </Route>
                  <Route path="/intro" exact>
                    <IntroPage />
                  </Route>
                  <Route path="/send" exact>
                    {(user)
                      ? <HamletPage />
                      : <Status401 />
                    }
                  </Route>
                  <Route path="/tasks/:task_id" exact>
                    {(user)
                      ? <MLTaskManager />
                      : <Status401 />
                    }
                  </Route>
                  <Route path="/tasks" exact>
                    {(user)
                      ? <MLTaskManager />
                      : <Status401 />
                    }
                  </Route>
                  <Route path="/config" exact>
                    <ConfigForm />
                  </Route>
                  <Route path="*">
                    <Status404 />
                  </Route>
                </Switch>
              </main>
          }
          <footer></footer>
        </>
      </Router>
    )
  }
}

App.contextType = AppContext

export default observer(App)
