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
            <span>Specify which subject set to move to: &nbsp;</span>
            <input
              value={workflowOutput.moveTarget}
              onChange={(e) => { workflowOutput.setMoveTarget(e.target.value) }}
            />
            {(userResources.status === ASYNC_STATES.SUCCESS && userResources.ownedSubjectSets && userResources.ownedSubjectSets.length > 0)  // If we know which resources the user has, we can show a <select> option. Otherwise, enable manual input.
              ? <div>
                  <span>or, choose from: &nbsp;</span>
                  <select
                    value={workflowOutput.moveTarget}
                    onChange={(e) => { workflowOutput.setMoveTarget(e.target.value) }}
                    class={!(userResources.ownedSubjectSets.map(i=>i.id).includes(workflowOutput.moveTarget)) ? 'greyed-out' : ''}
                  >
                    {userResources.ownedSubjectSets.map(item => (
                      <option key={`move-to-subjectset-${item.id}`} value={item.id}>
                        {item.id} - {item.display_name}
                    </option>
                    ))}
                  </select>
                </div>

              : null
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
            <span>Specify which workflow to retire from: &nbsp;</span>
            <input
              value={workflowOutput.retireTarget}
              onChange={(e) => { workflowOutput.setRetireTarget(e.target.value) }}
            />
            {(userResources.status === ASYNC_STATES.SUCCESS && userResources.ownedWorkflows && userResources.ownedWorkflows.length > 0)  // If we know which resources the user has, we can show a <select> option.
              ? <div>
                  <span>or, choose from: &nbsp;</span>
                  <select
                    value={workflowOutput.retireTarget}
                    onChange={(e) => { workflowOutput.setRetireTarget(e.target.value) }}
                    class={!(userResources.ownedWorkflows.map(i=>i.id).includes(workflowOutput.retireTarget)) ? 'greyed-out' : ''}
                  >
                    {userResources.ownedWorkflows.map(item => (
                      <option key={`retire-from-workflow-${item.id}`} value={item.id}>
                        {item.id} - {item.display_name}
                    </option>
                    ))}
                  </select>
                </div>
              : null
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

        <fieldset style={{ display: 'none' }}>  /*TODO*/
          <legend>Create &amp; Move to New Subject Set</legend>
          <div>
            <span>Choose a name for your new Subject Set: &nbsp;</span>
            <input
              value={workflowOutput.createTarget}
              onChange={(e) => { workflowOutput.setCreateTarget(e.target.value) }}
            />
          </div>

          <div>
            <button
              className="action button"
              onClick={this.doCreate.bind(this)}
            >
              Create &amp; Move
            </button>

            {(workflowOutput.operation === 'create')
              ? <var className="block">
                  {workflowOutput.status} {statusIcon(workflowOutput.status)}
                </var>
              : null
            }
            {(workflowOutput.operation === 'create' && workflowOutput.statusMessage && workflowOutput.statusMessage.length > 0)
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

  doCreate () {
    const workflowOutput = this.context.workflowOutput
    const mlSelection = this.context.mlSelection
    const selection = mlSelection.selection.toJSON() || []
    const subjectIds = getUniqueSubjectIds(selection)

    const createTarget = workflowOutput.createTarget.trim()

    if (createTarget.length === 0) {
      // TODO: better warnings
      alert('Please specify a name for the new Subject Set')
      return
    }

    workflowOutput.create(subjectIds, createTarget)
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
