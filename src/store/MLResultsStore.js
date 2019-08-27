import { types, getRoot } from 'mobx-state-tree'
import { ASYNC_STATES } from '@util'
import config from '@config'
import superagent from 'superagent'

const DEMO_URL = `${config.appRootUrl}demo-data/detections.txt`

const MLResultsStore = types.model('MLResultsStore', {
  
  status: types.optional(types.string, ASYNC_STATES.IDLE),
  statusMessage: types.maybe(types.string),
  data: types.frozen({}),
  
}).actions(self => ({
  
  reset () {
    self.status = ASYNC_STATES.IDLE
    self.statusMessage = undefined
    self.data = {}
  },

  setStatus (status, message = undefined) {
    self.status = status
    self.statusMessage = message
  },

  setData (val) {
    self.data = val
  },

  fetch (url) {
    const root = getRoot(self)
    self.setStatus(ASYNC_STATES.FETCHING)

    const _url = (!root.demoMode)
      ? url
      : DEMO_URL

    superagent
      .get(_url)

      .withCredentials()

      .then(res => {        
        if (res.ok) return JSON.parse(res.text)
        throw new Error('ML Results Store couldn\'t fetch() data')
      })

      .then(data => {
        self.setStatus(ASYNC_STATES.SUCCESS)
        self.setData(data)
        root.mlSelection.makeSelection()
      })

      .catch(err => {
        const message = err && err.toString() || undefined
        self.setStatus(ASYNC_STATES.ERROR, message)
        console.error('[MLResultsStore] ', err)
      })
  },
}))

export { MLResultsStore }
