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
        <h2>Step 2: Review Photos from ML Service</h2>
      
        <div className="info text">
          <p>
            At this step, you can retrieve the Subject images <b>(from animal camera traps)</b> you submitted to the external ML Service, <b>along with machine-tagged detection data.</b> Using this new machine-tagged data (which indicates the likelihood that your Subject image is <b>empty of animals or otherwise</b>), you can process the Subject images to an output - e.g. moving non-empty Subjects to a new worfklow for volunteers to examine, retiring empty Subjects, or download the list of images (along with their Zooniverse Subject data and the new ML detection data) as a CSV.
          </p>
          <p>Notes:</p>
          <ul>
            <li>The <b>ML Task Request ID</b> is the ID of job that you asked the Machine Learning service to perform on your images. You should have received it when you completed Step 1, usually from a direct URL to this page: e.g. <code>https://subject-assistant.zooniverse.org/#/tasks/1000</code></li>
            <li>A <b>Subject</b> is a unit of data on the Zooniverse platform. A Subject can have many images, but if you're new to the Zooniverse system, you can assume that one image = one Subject.</li>
            <li>If you want to <b>retire some Subjects</b>, there needs to be a <b>Workflow</b> to be <i>retired from.</i></li>
            <li>If you want to <b>move some Subjects</b>, there needs to be a <b>Subject Set</b> to be <i>moved to.</i></li>
          </ul>
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