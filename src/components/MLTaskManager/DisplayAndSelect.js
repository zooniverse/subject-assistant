import React from 'react'
import { observer } from 'mobx-react'
import AppContext from '@store'
import { ASYNC_STATES, stopEvent } from '@util'

const NUMBER_OF_SAMPLES = 20
const OPERATORS = {
  LESS_THAN: '<',
  GREATER_THAN: '>',
}

class DisplayAndSelect extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = {
      threshold: 50,
      operator: OPERATORS.LESS_THAN,
    }
  }
  
  render () {
    const mlTask = this.context.mlTask
    const mlResults = this.context.mlResults
    
    // If the results aren't ready, don't render this component.
    if (mlTask.status !== ASYNC_STATES.SUCCESS || mlResults.status !== ASYNC_STATES.SUCCESS) {
      return null
    }
    
    const info = mlResults.data.info || {}
    const images = mlResults.data.images || []
    
    return (
      <form className="form">
        <h2>Select Subjects</h2>
        <div className="info panel">
          {Object.keys(info).length && Object.keys(info).map(key => (
            <div key={`results-info-${key}`}><b>{key}</b> : <i>{info[key]}</i></div>
          ))}
        </div>
        {this.renderControls()}
        {this.renderSampleImages(images)}
      </form>
    )
  }
  
  renderControls () {
    return (
      <div className="panel">
      </div>
    )
  }

  renderSampleImages (images = []) {
    if (!images || !images.length) return
    
    // Pick a small sample from the images provided
    const numOfSamples = Math.min(images.length, NUMBER_OF_SAMPLES)
    const startIndex = Math.random() * (images.length - numOfSamples)
    const sampleImages = images.slice(startIndex, startIndex + numOfSamples)
    
    return (
      <ul className="image-list">
        {sampleImages.map((image, index) => {
          console.log('+++', image)
          const imgSrc = image.file || ''
          
          return (
            <li className="list-item" key={`results-image-${index}`}>
              <img src={imgSrc} />
            </li>
          )
        })}
      </ul>
    
    )
    
    
  }
}

DisplayAndSelect.contextType = AppContext

export default observer(DisplayAndSelect)
