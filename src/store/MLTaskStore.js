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
      
        .set('Content-Type', 'application/json')
        .withCredentials()
      
        .then(res => {
          self.setStatus(ASYNC_STATES.SUCCESS)
          console.log('+++ res', res)
        })
        
        .catch(err => {
          self.setStatus(ASYNC_STATES.ERROR)
          console.log('+++ err', err)
        })
    },
    
  }
})

export { MLTaskStore }
