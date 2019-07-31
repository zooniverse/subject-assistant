import { types } from 'mobx-state-tree'
import { ASYNC_STATES } from '@util'
import config from '@config'
import superagent from 'superagent'

const MLResultsStore = types.model('MLResultsStore', {
  
  status: types.optional(types.string, ASYNC_STATES.IDLE),
  data: types.optional(types.frozen({}), {}),
  
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
      self.setStatus(ASYNC_STATES.FETCHING)
      
      superagent
        .get(url)
      
        .withCredentials()
      
        .then(res => {
          if (res.ok) return JSON.parse(res.text)
          throw new Error('ERROR: ML Results Store can\'t fetch() data')
        })
      
        .then(data => {
          self.setStatus(ASYNC_STATES.SUCCESS)
          self.setData(data)
          
          console.log('+++ Data From ML Results: ', data)
        })
        
        .catch(err => {
          self.setStatus(ASYNC_STATES.ERROR)
          console.error('[MLResultsStore] ', err)
        })
    },
    
  }
})

export { MLResultsStore }