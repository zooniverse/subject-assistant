import { flow, getRoot, types } from 'mobx-state-tree'
import { ASYNC_STATES } from '@util'
import config from '@config'
import apiClient from 'panoptes-client'

const UserResourcesStore = types.model('UserResourcesStore', {

  projectStatus: types.optional(types.string, ASYNC_STATES.IDLE),
  projectStatusMessage: types.maybe(types.string),
  workflowStatus: types.optional(types.string, ASYNC_STATES.IDLE),
  workflowStatusMessage: types.maybe(types.string),
  subjectSetStatus: types.optional(types.string, ASYNC_STATES.IDLE),
  subjectSetStatusMessage: types.maybe(types.string),

  ownedProjects: types.array(types.frozen({})),
  ownedSubjectSets: types.array(types.frozen({})),
  ownedWorkflows: types.array(types.frozen({})),

  selectedProject: types.maybe(types.string),  // Selected project ID

}).actions(self => ({

  reset () {
    self.projectStatus = ASYNC_STATES.IDLE
    self.projectStatusMessage = undefined
    self.workflowStatus = ASYNC_STATES.IDLE
    self.workflowStatusMessage = undefined
    self.subjectSetStatus = ASYNC_STATES.IDLE
    self.subjectSetStatusMessage = undefined

    self.ownedProjects = []
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

      self.projectStatus = ASYNC_STATES.FETCHING

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

      /*
      for (let i = 0; i < projects.length; i++) {
        let project = projects[i];

        // Fetch all associated workflows.
        data = yield apiClient.type('workflows')
          .get({
            project_id: project.id,
          })
          .then(res => res)
          .catch(err => { throw err })
        workflows.push(...data)

        // Fetch all associated subject sets.
        data = yield apiClient.type('subject_sets')
          .get({
            project_id: project.id,
          })
          .then(res => res)
          .catch(err => { throw err })
        subjectSets.push(...data)
      }
      */

      self.ownedProjects = projects
      // self.ownedWorkflows = workflows
      // self.ownedSubjectSets = subjectSets

      if (projects.length > 0) self.selectProject(projects[0].id)
      // if (workflows.length > 0) root.workflowOutput.setRetireTarget(workflows[0].id)
      // if (subjectSets.length > 0) root.workflowOutput.setMoveTarget(subjectSets[0].id)

      self.projectStatus = ASYNC_STATES.SUCCESS

    } catch (err) {
      const message = err && err.toString() || undefined
      self.projectStatus = ASYNC_STATES.ERROR
      self.projectStatusMessage = message
      console.error('[UserResourcesStore] ', err)
    }

  }),

  selectProject (projectId = '') {
    self.selectedProject = projectId
  },
}))

export { UserResourcesStore }
