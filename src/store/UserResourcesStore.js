import { flow, getRoot, types } from 'mobx-state-tree'
import { ASYNC_STATES } from '@util'
import config from '@config'
import apiClient from 'panoptes-client'

const UserResourcesStore = types.model('UserResourcesStore', {

  projectsStatus: types.optional(types.string, ASYNC_STATES.IDLE),
  projectsStatusMessage: types.maybe(types.string),
  workflowsStatus: types.optional(types.string, ASYNC_STATES.IDLE),
  workflowsStatusMessage: types.maybe(types.string),
  subjectSetsStatus: types.optional(types.string, ASYNC_STATES.IDLE),
  subjectSetsStatusMessage: types.maybe(types.string),

  ownedProjects: types.array(types.frozen({})),
  ownedSubjectSets: types.array(types.frozen({})),
  ownedWorkflows: types.array(types.frozen({})),

  selectedProject: types.maybe(types.string),  // Selected project ID

}).actions(self => ({

  reset () {
    self.projectsStatus = ASYNC_STATES.IDLE
    self.projectsStatusMessage = undefined
    self.workflowsStatus = ASYNC_STATES.IDLE
    self.workflowsStatusMessage = undefined
    self.subjectSetsStatus = ASYNC_STATES.IDLE
    self.subjectSetsStatusMessage = undefined

    self.ownedProjects = []
    self.ownedSubjectSets = []
    self.ownedWorkflows = []

    const root = getRoot(self)
    root.workflowOutput.resetTargets()
  },

  resetDependents () {
    self.workflowsStatus = ASYNC_STATES.IDLE
    self.workflowsStatusMessage = undefined
    self.subjectSetsStatus = ASYNC_STATES.IDLE
    self.subjectSetsStatusMessage = undefined

    self.ownedSubjectSets = []
    self.ownedWorkflows = []

    const root = getRoot(self)
    root.workflowOutput.resetTargets()
  },

  fetchProjects: flow(function * fetchProjects () {
    const root = getRoot(self)

    try {
      let data = []
      let projects = []
      let workflows = []
      let subjectSets = []

      self.projectsStatus = ASYNC_STATES.FETCHING
      self.ownedProjects = []

      // Fetch all projects this user is an owner of.
      data = yield apiClient.type('projects')
        .get({
          current_user_roles: 'owner',
        })
        .then(res => res)
        .catch(err => { throw err })
      projects.push(...data)

      // Fetch all projects this user is a collaborator of.
      data = yield apiClient.type('projects')
        .get({
          current_user_roles: 'collaborator',
        })
        .then(res => res)
        .catch(err => { throw err })
      projects.push(...data)

      self.ownedProjects = projects

      if (projects.length > 0) self.selectProject(projects[0].id)

      self.projectsStatus = ASYNC_STATES.SUCCESS

    } catch (err) {
      const message = err && err.toString() || undefined
      self.projectsStatus = ASYNC_STATES.ERROR
      self.projectsStatusMessage = message
      console.error('[UserResourcesStore] ', err)
    }
  }),

  fetchWorkflows: flow(function * fetchWorkflows () {
    const root = getRoot(self)
    if (self.selectedProject === '') return

    try {
      let data = []
      let workflows = []

      self.workflowsStatus = ASYNC_STATES.FETCHING
      self.ownedWorkflows = []

      data = yield apiClient.type('workflows')
        .get({
          project_id: self.selectedProject,
        })
        .then(res => res)
        .catch(err => { throw err })
      workflows.push(...data)

      self.ownedWorkflows = workflows

      if (workflows.length > 0) root.workflowOutput.setRetireTarget(workflows[0].id)

      self.workflowsStatus = ASYNC_STATES.SUCCESS

    } catch (err) {
      const message = err && err.toString() || undefined
      self.workflowsStatus = ASYNC_STATES.ERROR
      self.workflowsStatusMessage = message
      console.error('[UserResourcesStore] ', err)
    }
  }),

  fetchSubjectSets: flow(function * fetchSubjectSets () {
    const root = getRoot(self)
    if (self.selectedProject === '') return

    try {
      let data = []
      let subjectSets = []

      self.subjectSetsStatus = ASYNC_STATES.FETCHING
      self.ownedSubjectSets = []

      data = yield apiClient.type('subject_sets')
        .get({
          project_id: self.selectedProject,
        })
        .then(res => res)
        .catch(err => { throw err })
      subjectSets.push(...data)

      self.ownedSubjectSets = subjectSets

      if (subjectSets.length > 0) root.workflowOutput.setMoveTarget(subjectSets[0].id)

      self.subjectSetsStatus = ASYNC_STATES.SUCCESS

    } catch (err) {
      const message = err && err.toString() || undefined
      self.subjectSetsStatus = ASYNC_STATES.ERROR
      self.subjectSetsStatusMessage = message
      console.error('[UserResourcesStore] ', err)
    }
  }),

  selectProject (projectId = '') {
    if (self.projectsStatus === ASYNC_STATES.FETCHING
        || self.workflowsStatus === ASYNC_STATES.FETCHING
        || self.subjectSetsStatus === ASYNC_STATES.FETCHING) {
      console.log('[UserResourcesStore] Please wait, current fetching user resources.')
      return
    }

    self.selectedProject = projectId
    self.resetDependents()
    self.fetchWorkflows()
    self.fetchSubjectSets()
  },
}))

export { UserResourcesStore }
