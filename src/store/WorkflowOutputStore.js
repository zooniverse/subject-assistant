import { flow, types } from 'mobx-state-tree'
import { ASYNC_STATES } from '@util'
import config from '@config'
import apiClient from 'panoptes-client'
import superagent from 'superagent'

const WorkflowOutputStore = types.model('WorkflowOutputStore', {
  operation: types.optional(types.enumeration('operation', ['', 'move', 'retire']), ''),
  status: types.optional(types.string, ASYNC_STATES.IDLE),
  statusMessage: types.maybe(types.string),
  
  moveTarget: types.optional(types.string, ''),
  retireTarget: types.optional(types.string, ''),
  
}).actions(self => ({
    
  reset () {
    self.operation = ''
    self.status = ASYNC_STATES.IDLE
    self.statusMessage = undefined
  },
  
  setMoveTarget (val) {
    self.moveTarget = val
  },
  
  setRetireTarget (val) {
    self.retireTarget = val
  },

  move: flow(function * moveToSubjectSet (subjectIds, subjectSetId) {
    self.operation = 'move'
    self.status = ASYNC_STATES.SENDING
    
    console.log('+++ MOVE: ', subjectIds, subjectSetId)
    
    const url = `${apiClient.root}/subject_sets/${subjectSetId}/links/subjects`
    
    console.log(apiClient.headers)
    console.log(url)
    
    try {
      const data = yield superagent
        .post(url)
        .withCredentials()
        .set('Accept', 'application/vnd.api+json; version=1')
        .set('Authorization', apiClient.headers.Authorization)
        .set('Content-Type', 'application/json')
        .send({
          subjects: subjectIds,
        })
        .then(res => {
          console.log('+++ res ', res)
          // throw new Error('Workflow Output Store couldn\'t move() data')
        })

      self.status = ASYNC_STATES.SUCCESS
      self.statusMessage = undefined
      
    } catch (err) {
      const message = err && err.toString() || undefined
      self.status = ASYNC_STATES.ERROR
      self.statusMessage = message
      console.error('[WorkflowOutputStore] ', err)
    }
    
  }),
  
  retire: flow(function * retireInWorkflow (subjectIds, workflowId) {
    self.operation = 'retire'
    self.status = ASYNC_STATES.SENDING
    
    console.log('+++ RETIRE: ', subjectIds, workflowId)
  }),
  
}))

export { WorkflowOutputStore }
