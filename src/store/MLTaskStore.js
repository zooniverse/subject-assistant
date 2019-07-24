import { types } from 'mobx-state-tree'
import { ASYNC_STATES } from '@util'
import config from '@config'
import superagent from 'superagent'

const TASKS_ENDPOINT = '/task'
const TASK_ID_STORAGE_KEY = 'mlTaskId'

const MLTaskStore = types.model('MLTaskStore', {
  
  status: types.optional(types.string, ASYNC_STATES.IDLE),
  id: types.optional(types.string, localStorage.getItem(TASK_ID_STORAGE_KEY) || ''),  // ID of the ML Task, specified by the user.
  task: types.optional(types.frozen({}), {}),  // Data related to the ML Task itself.
  results: types.optional(types.array(types.frozen({})), []),  // Data from the results file, which is linked to from the ML Task.
  
}).actions(self => {
  return {
    
    setStatus (val) {
      self.status = val
    },
    
    setId (val) {
      self.id = val
      localStorage.setItem(TASK_ID_STORAGE_KEY, val)
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
