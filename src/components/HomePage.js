import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage () {
  return (
    <article>
      <h2>Welcome!</h2>
      <div className="info text">
        <p>
          This is the Zooniverse Machine Learning Subject Assistant. This app was designed to help <b>Project Owners</b> on the <a href="https://www.zooniverse.org/" target="_blank">Zooniverse platform</a> to pre-select, pre-process, and/or filter out <b>image Subjects (from animal camera traps)</b> before presenting them to <b>Zooniverse volunteers</b> to classify.
        </p>
        <p>If you're not sure where to start, try the <Link to="/intro">Intro</Link> page.</p>
        
      </div>
      <ul className="nav-list">
        <li><Link to="/intro">Intro</Link></li>
        <li><Link to="/send">Step 1: Send Photos to ML Service</Link></li>
        <li><Link to="/tasks">Step 2: Review Photos from ML Service</Link></li>
        <li><Link to="/config">Advanced: App Config</Link></li>
      </ul>
    </article>
  )
}
