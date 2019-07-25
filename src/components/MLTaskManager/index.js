import React from 'react'
import { observer } from 'mobx-react'
import AppContext from '@store'
import Fetch from './Fetch'
import DisplayAndSelect from './DisplayAndSelect'

class MLTaskManager extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    return (
      <div className="mlTaskManager">
        <h2>ML Task Manager</h2>
        
        <p>
          This lets users fetch results from the ML service.
          For the moment, we're just testing fetch services from pretty much anywhere.
        </p>
        
        <Fetch />
      
        <DisplayAndSelect />
      
      </div>
    )
  }  
}

MLTaskManager.contextType = AppContext

export default observer(MLTaskManager)