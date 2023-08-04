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
            The ML model will produce a series of predictions on each image indicating whether or not the computer judged an image as empty with an associated confidence score. That confidence score can be used to parse images and determine the output. You have the option to export results to a .csv file, move certain subjects to a new or existing subject set, or retire them from circulation. 
          </p>
          <h3>
            Querying the returned data
          </h3>
          <p>
            The ML Task Request ID was generated in Step 1 and should be the link from which you were directed to reach this page. If you do not see the ID below, you can return to the project and subject set list in Hamlet to find the link and follow it. Select Fetch to view the results.
          </p>
          <p>
            You can now sort the images based on the ML confidence scores. Use the dropdown menus to select the subset of interest and enter the query and confidence level you are comfortable with. 
          </p>
          <p>
            For instance, if you want to retire images that are almost certainly empty, you could select the query 'where every image is &gt;= 75% likely to be empty'. All images that the computer annotated empty with a confidence of 75-100% will be included in this query. If you want to be more aggressive with retiring potentially empty subjects, you could decrease the confidence level to 50% or even 25%. 
          </p>
          <p>
            Note that the number of images in your subject set and the number within your selection criteria are listed below the query boxes. 
          </p>
          <h3>
            Distribution of selected images
          </h3>
          <p>
            Once you've selected a query, you must select the corresponding project in the dropdown below and then your action for the selection. 
          </p>
          <ul>
            <li>
              <b>(A) Export to a .csv file</b> &mdash; download the results of the ML model with the associated labels of empty/not empty. This will allow you to check that the model correctly classified images.
            </li>
            <li>
              <b>(B) Move subjects</b> &mdash; transfer the selection into an existing subject set by selecting it in the dropdown.
            </li>
            <li>
              <b>(C) Retire subjects</b> &mdash; Note that if you want to retire subjects, there must be a workflow to be retired from. Select it in the dropdown to remove these subjects from circulation within that workflow. 
            </li>
            <li>
              <b>(D) Create and move to new subject set</b> &mdash; create a new subject set for your project and populate it with the images in your selection. 
            </li>
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