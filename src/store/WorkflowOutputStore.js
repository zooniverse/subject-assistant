import { flow, types } from 'mobx-state-tree'
import { ASYNC_STATES } from '@util'
import config from '@config'
import apiClient from 'panoptes-client'

const WorkflowOutputStore = types.model('WorkflowOutputStore', {
  
  status: types.optional(types.string, ASYNC_STATES.IDLE),
  statusMessage: types.maybe(types.string),
  
  retirementTarget: types.optional(types.string, ''),
  
}).actions(self => ({
    
  reset () {
    self.status = ASYNC_STATES.IDLE
    self.statusMessage = undefined
  },
  
  setRetirementTarget (val) {
    self.retirementTarget = val
  },

  moveToWorkflow: flow(function * moveToWorkflow (workflowId, selection) {
    self.status = ASYNC_STATES.SENDING
    
  }),
  
  retire: flow(function * retire (subjectIds, retirementTarget) {
    self.status = ASYNC_STATES.SENDING
    
    console.log('+++ RETIRE: ', subjectIds)
  }),
  
}))

export { WorkflowOutputStore }
