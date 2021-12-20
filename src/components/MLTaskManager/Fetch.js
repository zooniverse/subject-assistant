import React, { useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react'
import AppContext from '@store'
import { ASYNC_STATES, statusIcon, stopEvent } from '@util'

function Fetch (props) {
  const context = useContext(AppContext)
  const history = useHistory()
  const mlTask = context.mlTask
  const mlResults = context.mlResults

  const { task_id } = useParams()
  const taskIsUndefined = mlTask.id === '' || mlTask.id === undefined

  // Set Task ID, if user directly accessed URL with Task ID
  if (task_id !== undefined && taskIsUndefined) {
    mlTask.setId(task_id)
  }

  return (
    <form className="form" onSubmit={(e) => { return stopEvent(e) }}>
      <h2>Fetch Task</h2>

      <fieldset>
        <legend>Status</legend>
        <var className="block">
          Task: {mlTask.status} {statusIcon(mlTask.status)}
          /
          Results: {mlResults.status} {statusIcon(mlResults.status)}
        </var>
        {(mlTask.statusMessage && mlTask.statusMessage.length > 0)
          ? <var className="error block">[Task] {mlTask.statusMessage}</var>
          : null
        }
        {(mlResults.statusMessage && mlResults.statusMessage.length > 0)
          ? <var className="error block">[Results] {mlResults.statusMessage}</var>
          : null
        }
      </fieldset>

      <fieldset>
        <legend>ML Task Request ID</legend>
        <div className="flex-row">
          <input
            className="text input flex-item grow"
            value={mlTask.id}
            readOnly={false}
            onChange={(e) => { mlTask.setId(e.target.value) }}
          />
          <button
            className="action button flex-item"
            type="button"
            onClick={(e) => {
              mlTask.doFetch()
              stopEvent(e)
              history.push(`/tasks/${mlTask.id}`)
            }}
          >
            Fetch
          </button>
        </div>
      </fieldset>

    </form>
  )
}

Fetch.contextType = AppContext

export default observer(Fetch)
