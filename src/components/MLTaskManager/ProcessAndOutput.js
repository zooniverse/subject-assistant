import React from 'react'
import { observer } from 'mobx-react'
import { parse } from 'json2csv'
import streamSaver from 'streamsaver'

import AppContext from '@store'
import { ASYNC_STATES, statusIcon, stopEvent } from '@util'

class ProcessAndOutput extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    const mlTask = this.context.mlTask
    const mlResults = this.context.mlResults
    const mlSelection = this.context.mlSelection
    const workflowOutput = this.context.workflowOutput
    const userResources = this.context.userResources
    
    // If the results aren't ready, don't render this component.
    if (mlTask.status !== ASYNC_STATES.SUCCESS || mlResults.status !== ASYNC_STATES.SUCCESS) {
      return null
    }
    
    return (
      <form className="form" onSubmit={(e) => { return stopEvent(e) }}>
        <h2>Process Selected Images</h2>
        <div className="info panel">
          You have selected {mlSelection.selection.length} images to process. You have a choice to...
        </div>
        <fieldset>
          <legend>Export to CSV</legend>
          <button
            className="action button"
            onClick={this.doExport.bind(this)}
          >
            Export
          </button>
        </fieldset>
            
        <fieldset>
          <legend>Move Subjects</legend>
          <div>
            <span>Select which subject set to move to: &nbsp;</span>
            {(userResources.status === ASYNC_STATES.SUCCESS && userResources.ownedSubjectSets && userResources.ownedSubjectSets.length > 0)  // If we know which resources the user has, we can show a <select> option. Otherwise, enable manual input.
              ? <select
                  value={workflowOutput.moveTarget}
                  onChange={(e) => { workflowOutput.setMoveTarget(e.target.value) }}
                >
                  {userResources.ownedSubjectSets.map(item => (
                    <option key={`move-to-subjectset-${item.id}`} value={item.id}>
                      {item.id} - {item.display_name}
                  </option>
                  ))}
                </select>

              : <input
                  value={workflowOutput.moveTarget}
                  onChange={(e) => { workflowOutput.setMoveTarget(e.target.value) }}
                />
            }
          </div>
          
          <div>
            <button
              className="action button"
              onClick={this.doMove.bind(this)}
            >
              Move
            </button>

            {(workflowOutput.operation === 'move')
              ? <var className="block">
                  {workflowOutput.status} {statusIcon(workflowOutput.status)}
                </var>
              : null
            }
            {(workflowOutput.operation === 'move' && workflowOutput.statusMessage && workflowOutput.statusMessage.length > 0)
              ? <var className="error block">{workflowOutput.statusMessage}</var>
              : null
            }
          </div>
            
        </fieldset>
            
        <fieldset>
          <legend>Retire Subjects</legend>
          <div>
            <span>Select which workflow to retire from: &nbsp;</span>
            {(userResources.status === ASYNC_STATES.SUCCESS && userResources.ownedWorkflows && userResources.ownedWorkflows.length > 0)  // If we know which resources the user has, we can show a <select> option. Otherwise, enable manual input.
              ? <select
                  value={workflowOutput.retireTarget}
                  onChange={(e) => { workflowOutput.setRetireTarget(e.target.value) }}
                >
                  {userResources.ownedWorkflows.map(item => (
                    <option key={`retire-from-workflow-${item.id}`} value={item.id}>
                      {item.id} - {item.display_name}
                  </option>
                  ))}
                </select>

              : <input
                  value={workflowOutput.retireTarget}
                  onChange={(e) => { workflowOutput.setRetireTarget(e.target.value) }}
                />
            }
          </div>
          
          <div>
            <button
              className="action button"
              onClick={this.doRetire.bind(this)}
            >
              Retire
            </button>

            {(workflowOutput.operation === 'retire')
              ? <var className="block">
                  {workflowOutput.status} {statusIcon(workflowOutput.status)}
                </var>
              : null
            }
            {(workflowOutput.operation === 'retire' && workflowOutput.statusMessage && workflowOutput.statusMessage.length > 0)
              ? <var className="error block">{workflowOutput.statusMessage}</var>
              : null
            }
          </div>
            
        </fieldset>
      </form>
    )
  }
  
  doExport () {
    const mlSelection = this.context.mlSelection
    const selection = mlSelection.selection.toJSON()
    let csvData = ''
    if (selection.length > 0) csvData = parse(selection, {})
    
    const fileStream = streamSaver.createWriteStream('subject-assistant.csv', {})
    
    const onSuccess = () => { console.log('EXPORT SUCCESS') }
    const onError = () => { console.error('EXPORT ERROR') }
    
    new Response(csvData).body.pipeTo(fileStream).then(onSuccess, onError)
  }

  doMove () {
    const workflowOutput = this.context.workflowOutput
    const mlSelection = this.context.mlSelection
    const selection = mlSelection.selection.toJSON() || []
    const subjectIds = getUniqueSubjectIds(selection)
    
    const moveTarget = workflowOutput.moveTarget.trim()
    
    if (moveTarget.length === 0) {
      // TODO: better warnings
      alert('Please specify a Subject Set to which these Subjects will be moved')
      return
    }
    
    workflowOutput.move(subjectIds, moveTarget)
  }

  doRetire () {
    const workflowOutput = this.context.workflowOutput
    const mlSelection = this.context.mlSelection
    const selection = mlSelection.selection.toJSON() || []
    const subjectIds = getUniqueSubjectIds(selection)
    
    const retireTarget = workflowOutput.retireTarget.trim()
    
    if (retireTarget.length === 0) {
      // TODO: better warnings
      alert('Please specify a Workflow from which these Subjects will be retired')
      return
    }
    
    workflowOutput.retire(subjectIds, retireTarget)
  }
}

function getUniqueSubjectIds (selection) {
  if (!selection) return []
  return selection
  .map(image => image.meta && image.meta.subject_id)
  .filter((subject_id, index, arr) => arr.indexOf(subject_id) === index)
}

ProcessAndOutput.contextType = AppContext

export default observer(ProcessAndOutput)
