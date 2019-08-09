import React from 'react'
import { Link } from 'react-router-dom'

export default function Home () {
  return (
    <article>
      <h2>Home</h2>
      <p>
        ...
      </p>
      <ul className="nav-list">
        <li><Link to="/tasks">ML Task Manager</Link></li>
        <li><Link to="/config">App Config</Link></li>
      </ul>
    </article>
  )
}
