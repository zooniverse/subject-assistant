import React from 'react'
import { Link } from 'react-router-dom'

export default function Home () {
  return (
    <ul>
      <li><Link to="/tasks">ML Task Manager</Link></li>
      <li><Link to="/form">Test Form</Link></li>
    </ul>
  )
}