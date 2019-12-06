import React from 'react'
import { Link } from 'react-router-dom'

export default function IntroPage () {
  return (
    <article>
      <h2>Introduction</h2>
      <div className="info text">
        <h3>What?</h3>
        <p>
          The Zooniverse Machine Learning Subject Assistant is an app that helps <b>ecological researchers</b> on the <a href="https://www.zooniverse.org" target="_blank">Zooniverse</a> platform to send their camera trap images to a Microsoft-powered Machine Learning (ML) service, which is trained to identify whether an image contains any wildlife.
        </p>
        <p>
          Using this ML-enriched data, researchers can then decide whether to:
        </p>
        <ol>
          <li>retire Subjects on the Zooniverse (useful for removing "empty of wildlife" images from the pool shown to Zooniverse volunteers)</li>
          <li>move Subjects to a new Zooniverse Subject Set (useful for placing "hard for to identify" images into a pool earmarked for further human effort), or</li>
          <li>download the ML-enriched data as a CSV file for further processing/research.</li>
        </ol>
        
        <h3>Why?</h3>
        <p>
          Machine Learning and AI tools can make the make the process of crowd-sourced research much more <i>efficient.</i>
        </p>
        <p>
          For example, instead of asking 100 human volunteers to look at 1,000,000 images to identify the animals in the photos, a researcher can use a machine to quickly filter out photos which are <i>almost certainly devoid of any animals,</i> and only ask humans to look at the remaining photos which are <i>"difficult for machines, easy for people"</i> to identify.
        </p>
    
        <h3>Who?</h3>
        <p>
          This app is designed for <a href="https://www.zooniverse.org" target="_blank">Zooniverse</a> <b>project owners,</b> who have ecological (wildlife) research projects that use <b>camera trap images.</b> For example: <a href="https://www.zooniverse.org/projects/zooniverse/snapshot-serengeti" target="_blank">Snapshot Serengeti.</a>
        </p>
    
        <h3>How?</h3>
        <p>
          There are a two major steps, assuming you've already created a Zooniverse <b>Project</b> and uploaded several wildlife camera trap photos as <b>Subjects</b>, organised into <b>Subject Sets.</b>
        </p>
        
        <p><Link to="/send">Step 1:</Link> you choose a <b>Subject Set</b> from your Project to submit to the external ML Service. You'll be doing this via another Zooniverse app called Hamlet, and the process might take a short while.</p>
        
        <p><Link to="/tasks">Step 2:</Link> using the machine-tagged data from the ML Service, you choose which Subjects to retire, move, or download. You'll be doing this via this Subject Assistant app.</p>
      </div>
      <ul className="nav-list">
        <li><Link className="go-back" to="/">Back</Link></li>
      </ul>
    </article>
  )
}
