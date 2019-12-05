import React from 'react'
import { Link } from 'react-router-dom'
import config from '@config'

export default function HamletPage () {
  return (
    <article>
      <h2>Step 1: Sending Photos to ML Service</h2>
      <div className="info text">
        <p>
          ...
        </p>
        
      </div>
      <ul className="nav-list">
        <li><a href={config.hamletUrl}>Go to Hamlet</a></li>
        <li><Link className="go-back" to="/">Back</Link></li>
      </ul>
    </article>
  )
}
