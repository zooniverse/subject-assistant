import { types, getRoot } from 'mobx-state-tree'
import { ASYNC_STATES } from '@util'
import config from '@config'
import superagent from 'superagent'

const MLResultsStore = types.model('MLResultsStore', {
  
  status: types.optional(types.string, ASYNC_STATES.IDLE),
  data: types.frozen({}),
  
}).actions(self => {
  return {
    
    reset () {
      self.status = ASYNC_STATES.IDLE
      self.data = {}
    },
    
    setStatus (val) {
      self.status = val
    },
    
    setData (val) {
      self.data = val
    },
    
    fetch (url) {
      const root = getRoot(self)
      self.setStatus(ASYNC_STATES.FETCHING)
      
      const _url = (!root.demoMode)
        ? _url
        : `${config.appRootUrl}demo-data/detections.txt`
      
      superagent
        .get(_url)
      
        .withCredentials()
      
        .then(res => {        
          if (res.ok) return JSON.parse(res.text)
          throw new Error('ERROR: ML Results Store can\'t fetch() data')
        })
      
        .then(data => {
          self.setStatus(ASYNC_STATES.SUCCESS)
          self.setData(data)
          root.mlSelection.makeSelection()
        })
        
        .catch(err => {
          self.setStatus(ASYNC_STATES.ERROR)
          console.error('[MLResultsStore] ', err)
        })
    },
    
  }
})

export { MLResultsStore }
