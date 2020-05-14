import React from 'react'
import { Link } from 'react-router-dom'
import config from '@config'

export default function HamletPage () {
  return (
    <article>
      <h2>Step 1: Send Photos to ML Service</h2>
      <div className="info text">
        <p>
          You need to access another Zooniverse app - called <b>Hamlet</b> - to send your photos to the Machine Learning Service.
        </p>
        <ol>
          <li>Go to <a href={config.hamletUrl}>Hamlet</a> and make sure you're <b>logged in</b> to the same Zooniverse account as the one you used for this app.</li>
          <li>You should see a list of your <b>Projects.</b> Choose one, then click on the <b>Subject Assistant</b> link.</li>
          <li>You should now see a list of <b>Subject Sets</b>. Choose one, then click on the <b>Generate</b> button.</li>
          <li><i>(Clicking that button submits all the photos in that Subject Set to the Machine Learning Service as a "job", and that job is identified by its "ML Task ID".</i></li>
          <li>Wait a minute or so, then <b>refresh the page.</b></li>
          <li>The page should now that your Subject Set export is "Complete", and you'll see an <b>ML Task ID.</b></li>
          <li>More importantly, the page will now have a <b>link</b> that says <i>"View the results on the Subject Assistant"</i> - clicking that link will take you directly to <Link to="/tasks">Step 2</Link>, with the ML Task ID pre-filled.</li>
        </ol>
      </div>
      <ul className="nav-list">
        <li><a href={config.hamletUrl} target="_blank">Go to Hamlet</a> (do this first)</li>
        <li><Link to="/tasks">Go to Step 2</Link> (after you've gone to Hamlet)</li>
        <li><Link className="go-back" to="/">Back</Link></li>
      </ul>
    </article>
  )
}
