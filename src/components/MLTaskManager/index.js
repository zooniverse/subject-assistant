import React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'

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
      <article className="mlTaskManager">
        <h2>ML Task Manager</h2>
      
        <div className="info text">
          <p>
            The Task Manager lets you retrieve the Subject images <em>(from animal camera traps)</em> you submitted to the external ML Service, <em>along with machine-tagged detection data.</em> Using this new machine-tagged data (which indicates the likelihood that your Subject image is <em>empty of animals or otherwise</em>), you can process the Subject images to an output - e.g. moving non-empty Subjects to a new worfklow for volunteers to examine, retiring empty Subjects, or download the list of images (along with their Zooniverse Subject data and the new ML detection data) as a CSV.
          </p>
        </div>
        
        <Fetch />
      
        <DisplayAndSelect />
      
        <ProcessAndOutput />
        
        <ul className="nav-list">
          <li><Link className="go-back" to="/">Back</Link></li>
        </ul>

      </article>
    )
  }  
}

MLTaskManager.contextType = AppContext

export default observer(MLTaskManager)