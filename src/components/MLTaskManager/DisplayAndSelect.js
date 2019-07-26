import React from 'react'
import { observer } from 'mobx-react'
import AppContext from '@store'
import { ASYNC_STATES, SELECTION_OPERATORS, SELECTION_THRESHOLD, stopEvent } from '@util'

class DisplayAndSelect extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    const mlTask = this.context.mlTask
    const mlResults = this.context.mlResults
    const mlSelection = this.context.mlSelection
    
    // If the results aren't ready, don't render this component.
    if (mlTask.status !== ASYNC_STATES.SUCCESS || mlResults.status !== ASYNC_STATES.SUCCESS) {
      return null
    }
    
    const info = mlResults.data.info || {}
    const images = mlSelection.sample || []
    
    return (
      <form className="form" onSubmit={(e) => { return stopEvent(e) }}>
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
    const mlSelection = this.context.mlSelection
    
    return (
      <div className="panel">
        
        <select
          onChange={(e) => { mlSelection.setOperator(e.target.value) }}
          value={mlSelection.operator}
        >
          {Object.keys(SELECTION_OPERATORS).map(key => (
            <option
              key={`selection-operator-${key}`}
              val={SELECTION_OPERATORS[key]}
            >
              {SELECTION_OPERATORS[key]}
            </option>
          ))}
        </select>
        
        <input
          value={mlSelection.threshold}
          onChange={(e) => { mlSelection.setThreshold(e.target.value) }}
        />
        
        <button
          className="action button"
          type="button"
          onClick={(e) => { mlSelection.makeSelection() }}
        >
          Update
        </button>
      </div>
    )
  }

  renderSampleImages (images = []) {
    if (!images || !images.length) return
        
    return (
      <ul className="image-list">
        {images.map((image, index) => {
          // console.log('+++', image)
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
  
  updateSelection () {
    
  }
}

DisplayAndSelect.contextType = AppContext

export default observer(DisplayAndSelect)
