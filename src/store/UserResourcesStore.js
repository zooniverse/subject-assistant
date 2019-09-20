import { flow, getRoot, types } from 'mobx-state-tree'
import { ASYNC_STATES } from '@util'
import config from '@config'
import superagent from 'superagent'

const UserResourcesStore = types.model('UserResourcesStore', {
  
  operation: types.optional(types.enumeration('operation', ['', 'subjectSets', 'workflows']), ''),
  status: types.optional(types.string, ASYNC_STATES.IDLE),
  statusMessage: types.maybe(types.string),
  
  ownedProjects: types.frozen({}),
  ownedSubjectSets: types.frozen({}),
  ownedWorkflows: types.frozen({}),
  
}).actions(self => ({
  
  reset () {
    self.operation = ''
    self.status = ASYNC_STATES.IDLE
    self.statusMessage = undefined
    
    self.ownedProjects = {}
    self.ownedSubjectSets = {}
    self.ownedWorkflows = {}
  },

  fetch: flow(function * fetch (url) {
    
    console.log('+++ FETCH')
    
  }),
}))

export { UserResourcesStore }
