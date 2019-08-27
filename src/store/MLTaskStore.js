import { types, getRoot } from 'mobx-state-tree'
import { ASYNC_STATES, API_RESPONSE } from '@util'
import config from '@config'
import superagent from 'superagent'

const TASKS_ENDPOINT = '/task'
const TASK_ID_STORAGE_KEY = 'mlTaskId'
const DEMO_URL = `${config.appRootUrl}demo-data/task.txt`

const MLTaskStore = types.model('MLTaskStore', {
  
  status: types.optional(types.string, ASYNC_STATES.IDLE),
  statusMessage: types.maybe(types.string),
  id: types.optional(types.string, localStorage.getItem(TASK_ID_STORAGE_KEY) || ''),  // ID of the ML Task, specified by the user.
  data: types.frozen({}),  // Data related to the ML Task itself.
  
  // Data from the results file, which is linked to from the ML Task, is stored in the MLResultsStore.
  
}).actions(self => ({

  reset () {
    self.status = ASYNC_STATES.IDLE
    self.statusMessage = undefined
    self.data = {}

    const root = getRoot(self)
    root.mlResults.reset()
  },

  setStatus (status, message = undefined) {
    self.status = status
    self.statusMessage = message
  },

  setStatusMessage (val) {
    self.statusMessage = val
  },

  setId (val) {
    self.id = val
    localStorage.setItem(TASK_ID_STORAGE_KEY, val)
  },

  setData (val) {
    self.data = val
  },

  fetch () {
    const root = getRoot(self)

    self.reset()
    self.setStatus(ASYNC_STATES.FETCHING)

    const url = (!root.demoMode)
      ? `${config.mlServiceUrl}${TASKS_ENDPOINT}/${self.id}`
      : DEMO_URL

    superagent
      .get(url)

      .withCredentials()

      .then(res => {
        if (res.ok) return res.body || JSON.parse(res.text)  // The latter is for demo-data
        throw new Error('ML Task Store can\'t fetch() data')
      })

      .then(data => {
        self.setStatus(ASYNC_STATES.SUCCESS)
        self.setData(data)

        if (data.status && typeof(data.status) === 'object') {

          switch (data.status.request_status) {
            case API_RESPONSE.REQUEST_STATUS.COMPLETED:

              const url = data.status.message && data.status.message.output_file_urls && data.status.message.output_file_urls.detections
              if (!url) throw new Error('ML Task did not have any valid results.')
              root.mlResults.fetch(url)
              return

            case API_RESPONSE.REQUEST_STATUS.RUNNING:
              throw new Error('ML Task is still running on the ML Service. Please check again later.')

            case API_RESPONSE.REQUEST_STATUS.FAILED:

              const message = data.status.message
              if (data.status.message) throw new Error(`ML Task failed. The ML Service said: ${data.status.message}`)
              throw new Error('ML Task failed. No reason was specified.')

          }
        } else if (data.status === API_RESPONSE.STATUS.NOT_FOUND) {
          throw new Error('ML Task could not be found. Please check that the Request ID is correct, and that the ML Task hasn\'t expired/been removed from the ML Service.')
        }

        throw new Error('ML Task encountered an unknown error.')
      })

      .catch(err => {
        const message = err && err.toString() || undefined
        self.setStatus(ASYNC_STATES.ERROR, message)
        console.error('[MLTaskStore] ', err)
      })
  },
}))

export { MLTaskStore }
