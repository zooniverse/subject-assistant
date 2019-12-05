import React from 'react'
import { Link } from 'react-router-dom'

export default function IntroPage () {
  return (
    <article>
      <h2>Introduction</h2>
      <div className="info text">
        <p>
          ...
        </p>
      </div>
      <ul className="nav-list">
        <li><Link className="go-back" to="/">Back</Link></li>
      </ul>
    </article>
  )
}
