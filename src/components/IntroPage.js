import React from 'react'
import { Link } from 'react-router-dom'

export default function IntroPage () {
  return (
    <article>
      <h2>Introduction</h2>
      <div className="info text">
        <p>
          The Zooniverse Machine Learning Subject Assistant is an app designed to help researchers integrate machine learning (ML) to speed up the process of reviewing and classifying large datasets. 
        </p>
        <p>
          Combining ML with volunteer effort can increase efficiency and decrease the time to classification for many datasets. Instead of asking volunteers to classify every image, researchers can selectively target the images that need human review. For example, ecology projects can quickly filter out images devoid of animals and ask humans to spend their time extracting data about wildlife from the remaining images.
        </p>
        <p>
          Zooniverse currently offers this service to ecology and conservation projects using camera trap images to monitor wildlife and astrophysics projects using telescope images to classify galaxy morphologies. 
        </p>
        <p>
          <b>Ecologists</b> can run Microsoft's MegaDetector object detection model, which was designed to filter out 'empty' or 'blank' images (those without animals in them) across a wide variety of terrestrial habitats and biomes. 
        </p>
        <p>
          <b>Astrophysicists</b> also have a detection model, <i>though details will be added to this page later.</i>
        </p>
        <p>
          Using this ML-enriched data, researchers can then decide whether to:
        </p>
        <ol>
          <li>
            Retire subjects from circulation on the Zooniverse (useful for removing "empty of wildlife" images from the pool shown to Zooniverse volunteers)
          </li>
          <li>
            Move subjects to a new Zooniverse Subject Set (useful for placing "hard to identify" images into a pool earmarked for further human effort), or
          </li>
          <li>
            Download the ML-enriched data as a .csv file for further processing/research.
          </li>
        </ol>
        <p>
          Researchers in either domain can also export images to Google's AutoML service to train a new ML algorithm to identify images within their study system. 
        </p>
        <h3>
          Ready to get started?
        </h3>
        <p>
          First, you must create a Zooniverse project and upload your images into a Zooniverse 'Subject Set'. Then you can proceed to:
        </p>
        <p>
          <Link to="/send">Step 1:</Link> Access the external ML service via the Zooniverse gateway program 'Hamlet' and select the subject set you want to analyze with ML. 
        </p>
        <p>
          <Link to="/tasks">Step 2:</Link> Retrieve the machine-tagged data and decide which subjects to retire, move, or download. 
        </p>
      </div>
      <ul className="nav-list">
        <li><Link className="go-back" to="/">Back</Link></li>
      </ul>
    </article>
  )
}
