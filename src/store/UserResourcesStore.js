import { flow, getRoot, types } from 'mobx-state-tree'
import { ASYNC_STATES } from '@util'
import config from '@config'
import apiClient from 'panoptes-client'
import superagent from 'superagent'

const UserResourcesStore = types.model('UserResourcesStore', {
  
  operation: types.optional(types.enumeration('operation', ['', 'subjectSets', 'workflows']), ''),
  status: types.optional(types.string, ASYNC_STATES.IDLE),
  statusMessage: types.maybe(types.string),
  
  ownedProjects: types.array(types.frozen({})),
  ownedSubjectSets: types.array(types.frozen({})),
  ownedWorkflows: types.array(types.frozen({})),
  
}).actions(self => ({
  
  reset () {
    self.operation = ''
    self.status = ASYNC_STATES.IDLE
    self.statusMessage = undefined
    
    self.ownedProjects = []
    self.ownedSubjectSets = []
    self.ownedWorkflows = []
  },

  fetch: flow(function * fetch (url) {
    
    console.log('+++ FETCH')
    
    try {
      let projects = []
      projects = yield apiClient.type('projects')
        .get({
          current_user_roles: 'owner',
          sort: 'display_name',
        })
        .then(res => res)
        .catch(err => { throw err })
      
      self.ownedProjects.push(...projects)
      
      console.log('+++ DATA 1: ', projects)
      
      projects = yield apiClient.type('projects')
        .get({
          current_user_roles: 'collaborator',
          sort: 'display_name',
        })
        .then(res => res)
        .catch(err => { throw err })
      
      self.ownedProjects.push(...projects)
      
      console.log('+++ DATA 2: ', projects)
    
    } catch (err) {
      const message = err && err.toString() || undefined
      self.status = ASYNC_STATES.ERROR
      self.statusMessage = message
      console.error('[UserResourcesStore] ', err)
    }
    
  }),
}))

export { UserResourcesStore }
