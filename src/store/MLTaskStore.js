import { types } from 'mobx-state-tree'
import { ASYNC_STATES } from '@util'
import superagent from 'superagent'

const MLTaskStore = types.model('MLTaskStore', {
  
  status: types.optional(types.string, ASYNC_STATES.IDLE),
  data: types.optional(types.array(types.frozen({})), []),
  
}).actions(self => {
  return {
    
    setStatus (val) {
      self.status = val
    },
    
    testFetch (url = 'https://www.zooniverse.org/api/projects') {
      self.setStatus(ASYNC_STATES.FETCHING)
      
      superagent
        .get(url)
      
        // Zooniverse API
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/vnd.api+json; version=1')
      
        .end((err, res) => {
          self.setStatus(ASYNC_STATES.SUCCESS)
          console.log(res)
        })
    }
    
  }
})

export { MLTaskStore }
