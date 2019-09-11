import { flow, types } from 'mobx-state-tree'
import { ASYNC_STATES } from '@util'
import config from '@config'
import apiClient from 'panoptes-client'

const WorkflowOutputStore = types.model('WorkflowOutputStore', {
  
  status: types.optional(types.string, ASYNC_STATES.IDLE),
  statusMessage: types.maybe(types.string),
  
  moveTarget: types.optional(types.string, ''),
  retireTarget: types.optional(types.string, ''),
  
}).actions(self => ({
    
  reset () {
    self.status = ASYNC_STATES.IDLE
    self.statusMessage = undefined
  },
  
  setMoveTarget (val) {
    self.moveTarget = val
  },
  
  setRetireTarget (val) {
    self.retireTarget = val
  },

  move: flow(function * moveToSubjectSet (subjectIds, subjectSet) {
    self.status = ASYNC_STATES.SENDING
    
    console.log('+++ MOVE: ', subjectIds, subjectSet)
  }),
  
  retire: flow(function * retireInWorkflow (subjectIds, workflowId) {
    self.status = ASYNC_STATES.SENDING
    
    console.log('+++ RETIRE: ', subjectIds, workflowId)
  }),
  
}))

export { WorkflowOutputStore }
