import React from 'react'
import { Link } from 'react-router-dom'

export default function Home () {
  return (
    <article>
      <h2>Welcome! (Prototype version)</h2>
      <div className="info text">
        <p>
          This is the Zooniverse Machine Learning Subject Assistant. This app was designed to help <em>Project Owners</em> on the <a href="https://www.zooniverse.org/" target="_blank">Zooniverse platform</a> to pre-select, pre-process, and/or filter out <em>image Subjects (from animal camera traps)</em> before presenting them to <em>Zooniverse volunteers</em> to classify.
        </p>
        <p>
          To begin, you need to either:
        </p>
        <ol>
          <li>already have an ML Task Request submitted to the external ML Service, written down its Task ID, and configured the ML Service in the App Config (below).</li>
          <li>or, much more easily, <em>enable Demo Mode</em> at the top ☝️</li>
        </ol>
        <p>
          and then open the <em>ML Task Manager.</em>
        </p>
      </div>
      <ul className="nav-list">
        <li><Link to="/tasks">ML Task Manager</Link></li>
        <li><Link to="/config">App Config</Link></li>
      </ul>
    </article>
  )
}
