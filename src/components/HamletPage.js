import React from 'react'
import { Link } from 'react-router-dom'
import config from '@config'

export default function HamletPage () {
  return (
    <article>
      <h2>Step 1: Send Photos to ML Service</h2>
      <div className="info text">
        <p>
          You need to access another Zooniverse app called 'Hamlet' to send your photos to the Machine Learning Service.
        </p>
        <ol>
          <li>
            Go to Hamlet and log in to the same Zooniverse account as the one you used in the Project Builder to create your project. 
          </li>
          <li>
            You should see a list of your Projects. Choose one, then click on the relevant Subject Assistant link (<b>Camera Traps</b> for wildlife; <b>Zoobot</b> for galaxies; or <b>AutoML</b> if you want to train your own ML algorithm via Google's service).
          </li>
          <li>
            You should now see a list of subject sets within your project. Click the Generate button next to the subject set you'd like to analyze with ML. (Clicking that button submits all the photos in that subject set to the Machine Learning Service as a "job", and that job is identified by its "ML Task ID".)
          </li>
          <li>
            Wait several minutes, then <b>refresh the page.</b>
          </li>
          <li>
            The page should now show that your Subject Set export is "Complete", and you'll see an ML Task ID.
          </li>
        </ol>
        <p>
          Once you have an ML Task ID for your job, you can click on that link to take you directly to Step 2 with the job ID pre-filled. 
        </p>
      </div>
      <ul className="nav-list">
        <li><a href={config.hamletUrl} target="_blank">Go to Hamlet</a> (do this first)</li>
        <li><Link to="/tasks">Go to Step 2</Link> (after you've gone to Hamlet)</li>
        <li><Link className="go-back" to="/">Back</Link></li>
      </ul>
    </article>
  )
}
