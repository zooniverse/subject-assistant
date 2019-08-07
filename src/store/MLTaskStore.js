import { types, getRoot } from 'mobx-state-tree'
import { ASYNC_STATES, API_RESPONSE } from '@util'
import config from '@config'
import superagent from 'superagent'

const TASKS_ENDPOINT = '/task'
const TASK_ID_STORAGE_KEY = 'mlTaskId'
const DEMO_URL = `${config.appRootUrl}demo-data/task.txt`

const MLTaskStore = types.model('MLTaskStore', {
  
  status: types.optional(types.string, ASYNC_STATES.IDLE),
  id: types.optional(types.string, localStorage.getItem(TASK_ID_STORAGE_KEY) || ''),  // ID of the ML Task, specified by the user.
  data: types.frozen({}),  // Data related to the ML Task itself.
  
  // Data from the results file, which is linked to from the ML Task, is stored in the MLResultsStore.
  
}).actions(self => {
  return {
    
    reset () {
      self.status = ASYNC_STATES.IDLE
      self.data = {}
      
      const root = getRoot(self)
      root.mlResults.reset()
    },
    
    setStatus (val) {
      self.status = val
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
          throw new Error('ERROR: ML Task Store can\'t fetch() data')
        })
      
        .then(data => {
          self.setStatus(ASYNC_STATES.SUCCESS)
          self.setData(data)
          
          if (data.status && typeof(data.status) === 'object') {
            
            if (data.status.request_status === API_RESPONSE.REQUEST_STATUS.COMPLETED) {
              const url = data.status.message && data.status.message.output_file_urls && data.status.message.output_file_urls.detections
              
              if (url) {
                root.mlResults.fetch(url)
              } else {
                // TODO
              }
              
            } else {
              // TODO
            }
            
          } else {
            throw new Error('ERROR: the ML Task could not be found or did not have any valid results.')
          }
        })
        
        .catch(err => {
          self.setStatus(ASYNC_STATES.ERROR)
          console.error('[MLTaskStore] ', err)
        })
    },
    
  }
})

export { MLTaskStore }
