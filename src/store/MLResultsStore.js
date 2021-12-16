import { flow, getRoot, types } from 'mobx-state-tree'
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

  doFetch: flow(function * doFetch (url) {
    const root = getRoot(self)
    self.status = ASYNC_STATES.FETCHING
    self.statusMessage = undefined

    const proxiedUrl = `${config.proxyUrl}?url=${encodeURIComponent(url)}`
    
    const _url = (!root.demoMode)
      ? proxiedUrl
      : DEMO_URL

    try {
      const data = yield superagent
        .get(_url)
        .withCredentials()
        .then(res => {        
          if (res.ok) return JSON.parse(res.text)
          throw new Error('ML Results Store couldn\'t doFetch() data')
        })

      self.status = ASYNC_STATES.SUCCESS
      self.statusMessage = undefined
      self.data = data

      root.mlSelection.makeSelection()
      
    } catch (err) {
      const message = err && err.toString() || undefined
      self.status = ASYNC_STATES.ERROR
      self.statusMessage = message
      console.error('[MLResultsStore] ', err)
    }
    
  }),
}))

export { MLResultsStore }
