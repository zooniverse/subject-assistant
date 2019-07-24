import { types } from 'mobx-state-tree'
import { ASYNC_STATES } from '@util'
import config from '@config'
import superagent from 'superagent'

const TASKS_ENDPOINT = '/task'

const MLTaskStore = types.model('MLTaskStore', {
  
  status: types.optional(types.string, ASYNC_STATES.IDLE),
  id: types.optional(types.string, ''),
  data: types.optional(types.array(types.frozen({})), []),
  
}).actions(self => {
  return {
    
    setStatus (val) {
      self.status = val
    },
    
    setId (val) {
      self.id = val
    },
    
    fetchTask () {
      const url = `${config.mlServiceUrl}${TASKS_ENDPOINT}/${self.id}`
      
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
