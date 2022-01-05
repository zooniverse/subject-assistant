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

    if (mlTask.status !== ASYNC_STATES.SUCCESS || mlResults.status !== ASYNC_STATES.SUCCESS) {
      return null
    }

    const moveTarget = workflowOutput.moveTarget.trim()
    const retireTarget = workflowOutput.retireTarget.trim()
    const createTarget = workflowOutput.createTarget.trim()

    return (
      <form className="form" onSubmit={(e) => { return stopEvent(e) }}>
        <h2>Process Selected Images</h2>
        <div className="info panel">
          You have selected {mlSelection.selection.length} images to process. You have the following options:
        </div>
        <fieldset>
          <legend>A. Export to CSV</legend>
          <button
            className="action button"
            onClick={this.doExport.bind(this)}
          >
            Export
          </button>
        </fieldset>

        <div className="info panel">
          {(userResources.projectsStatus === ASYNC_STATES.SUCCESS) ?
            <select
              value={userResources.selectedProject}
              onChange={(e) => { userResources.selectProject(e.target.value) }}
            >
              <option key={`select-project-____`} value={''}>
                &laquo; To access the options below, first select a Project &raquo;
              </option>
              {userResources.ownedProjects.map(item => (
                <option key={`select-project-${item.id}`} value={item.id}>
                  {item.id} - {item.display_name}
                </option>
              ))}
            </select>
            : statusIcon(userResources.projectsStatus)
          }
        </div>

        <fieldset>
          <legend>B. Move Subjects</legend>
          <div>
            <span>Specify which subject set to move to: &nbsp;</span>
            {userResources.subjectSetsStatus !== ASYNC_STATES.SUCCESS && statusIcon(userResources.subjectSetsStatus)}
            {(userResources.subjectSetsStatus === ASYNC_STATES.SUCCESS && userResources.ownedSubjectSets.length > 0)
              ? <select
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
              : null
            }
          </div>

          <div>
            {(moveTarget) ?
              <button
                className="action button"
                onClick={this.doMove.bind(this)}
              >
                Move
              </button>
              :
              <span>(Please choose a Project and a Subject Set)</span>
            }

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
          <legend>C. Retire Subjects</legend>
          <div>
            <span>Specify which workflow to retire from: &nbsp;</span>
            {userResources.workflowsStatus !== ASYNC_STATES.SUCCESS && statusIcon(userResources.workflowsStatus)}
            {(userResources.workflowsStatus === ASYNC_STATES.SUCCESS && userResources.ownedWorkflows.length > 0)
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
            {(retireTarget) ?
              <button
                className="action button"
                onClick={this.doRetire.bind(this)}
              >
                Retire
              </button>
              :
              <span>(Please choose a Project and a Workflow)</span>
            }

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

        <fieldset>
          <legend>D. Create &amp; Move to New Subject Set</legend>
          <div>
            <span>Choose a name for your new Subject Set: &nbsp;</span>
            {(userResources.selectedProject)
              ? <input
                  value={workflowOutput.createTarget}
                  onChange={(e) => { workflowOutput.setCreateTarget(e.target.value) }}
                />
              : statusIcon(ASYNC_STATES.IDLE)
            }
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
    const { selectedProject } = this.context.userResources

    const createTarget = workflowOutput.createTarget.trim()

    if (createTarget.length === 0) {
      // TODO: better warnings
      alert('Please specify a name for the new Subject Set')
      return
    }

    workflowOutput.create(subjectIds, createTarget, selectedProject)
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
