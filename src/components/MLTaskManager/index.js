import React from 'react'
import { observer } from 'mobx-react'
import AppContext from '@store'
import Fetch from './Fetch'
import DisplayAndSelect from './DisplayAndSelect'
import ProcessAndOutput from './ProcessAndOutput'

class MLTaskManager extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    return (
      <div className="mlTaskManager">
        <h2>ML Task Manager</h2>
        
        <Fetch />
      
        <DisplayAndSelect />
      
        <ProcessAndOutput />

      </div>
    )
  }  
}

MLTaskManager.contextType = AppContext

export default observer(MLTaskManager)