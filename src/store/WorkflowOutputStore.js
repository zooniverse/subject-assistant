import { types, getRoot } from 'mobx-state-tree'
import { ASYNC_STATES } from '@util'
import config from '@config'
import apiClient from 'panoptes-client'

const WorkflowOutputStore = types.model('WorkflowOutputStore', {
  
  status: types.optional(types.string, ASYNC_STATES.IDLE),
  statusMessage: types.maybe(types.string),
  
  // Data from the results file, which is linked to from the ML Task, is stored in the MLResultsStore.
  
}).actions(self => {
  return {
    
    reset () {
      self.status = ASYNC_STATES.IDLE
      self.statusMessage = undefined
    },
    
    setStatus (status, message = undefined) {
      self.status = status
      self.statusMessage = message
    },
    
    setStatusMessage (val) {
      self.statusMessage = val
    },
    
  }
})

export { WorkflowOutputStore }
