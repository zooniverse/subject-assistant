import { flow, getRoot, types } from 'mobx-state-tree'
import { ASYNC_STATES, API_RESPONSE } from '@util'
import config from '@config'

const TASKS_ENDPOINT = '/task'
const DEMO_URL = `${config.appRootUrl}demo-data/task.txt`

const MLTaskStore = types.model('MLTaskStore', {

  status: types.optional(types.string, ASYNC_STATES.IDLE),
  statusMessage: types.maybe(types.string),
  id: types.optional(types.string, ''),  // ID of the ML Task, specified by the user.
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

  setId (val) {
    if (self.id !== val) self.reset()
    self.id = val
  },

  doFetch: flow(function * doFetch () {
    const root = getRoot(self)

    self.reset()
    self.status = ASYNC_STATES.FETCHING
    self.statusMessage = undefined

    const serviceUrl = `${TASKS_ENDPOINT}/${self.id}`
    const proxiedUrl = `${config.proxyUrl}?url=${encodeURIComponent(serviceUrl)}&target=msml`

    const url = (!root.demoMode)
      ? proxiedUrl
      : DEMO_URL

    try {
      const data = yield fetch(url, {
        method: 'GET',
        credentials: 'include',
      }).then(res => {
        if (res.ok) return res.json() || JSON.parse(res.text)  // The latter is for demo-data
        throw new Error('ML Task Store can\'t doFetch() data')
      })

      self.status = ASYNC_STATES.SUCCESS
      self.statusMessage = undefined
      self.data = data

      if (data.Status && typeof(data.Status) === 'object') {

        switch (data.Status.request_status) {
          case API_RESPONSE.REQUEST_STATUS.COMPLETED:

            const url = data.Status.message && data.Status.message.output_file_urls && data.Status.message.output_file_urls.detections
            if (!url) throw new Error('ML Task did not have any valid results.')
            root.mlResults.doFetch(url)
            return

          case API_RESPONSE.REQUEST_STATUS.RUNNING:
            throw new Error('ML Task is still running on the ML Service. Please check again later.')

          case API_RESPONSE.REQUEST_STATUS.FAILED:

            const message = data.Status.message
            if (data.Status.message) throw new Error(`ML Task failed. The ML Service said: ${data.Status.message}`)
            throw new Error('ML Task failed. No reason was specified.')

        }
      } else if (data.Status === API_RESPONSE.STATUS.NOT_FOUND) {
        throw new Error('ML Task could not be found. Please check that the Request ID is correct, and that the ML Task hasn\'t expired/been removed from the ML Service.')
      }

      throw new Error('ML Task encountered an unknown error.')

    } catch (err) {
      const message = err && err.toString() || undefined
      self.status = ASYNC_STATES.ERROR
      self.statusMessage = message
      console.error('[MLTaskStore] ', err)
    }

  }),

}))

export { MLTaskStore }
