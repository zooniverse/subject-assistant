import { flow, types } from 'mobx-state-tree'
import { ASYNC_STATES } from '@util'
import config from '@config'
import apiClient from 'panoptes-client'
import superagent from 'superagent'

const WorkflowOutputStore = types.model('WorkflowOutputStore', {
  operation: types.optional(types.enumeration('operation', ['', 'move', 'retire', 'create']), ''),
  status: types.optional(types.string, ASYNC_STATES.IDLE),
  statusMessage: types.maybe(types.string),

  moveTarget: types.optional(types.string, ''),
  retireTarget: types.optional(types.string, ''),
  createTarget: types.optional(types.string, ''),

}).actions(self => ({

  reset () {
    self.operation = ''
    self.status = ASYNC_STATES.IDLE
    self.statusMessage = undefined

    self.moveTarget = ''
    self.retireTarget = ''
    self.createTarget = ''
  },

  resetTargets () {
    self.moveTarget = ''
    self.retireTarget = ''
    self.createTarget = ''
  },

  setMoveTarget (val) {
    self.moveTarget = val
  },

  setRetireTarget (val) {
    self.retireTarget = val
  },

  setCreateTarget (val) {
    self.createTarget = val
  },

  move: flow(function * moveToSubjectSet (subjectIds, subjectSetId) {
    self.operation = 'move'
    self.status = ASYNC_STATES.SENDING
    self.statusMessage = undefined

    const url = `${apiClient.root}/subject_sets/${subjectSetId}/links/subjects`

    try {
      const data = yield superagent
        .post(url)
        // .withCredentials()  // Do NOT use this after Dec 2019, due to changes with the Panoptes API.
        .set('Accept', 'application/vnd.api+json; version=1')
        .set('Authorization', apiClient.headers.Authorization)
        .set('Content-Type', 'application/json')
        .send({
          subjects: subjectIds,
        })
        .then(res => {
          if (res.ok) return res.body
          throw new Error()
        })
        .catch(err => {
          const res = (err && err.response) || {}
          if (res.status === 404) {
            throw new Error('[404] Subject Set couldn\'t be found. Either that Subject Set doesn\'t exist or you don\'t have access to it. Please confirm that you are logged in to a Zooniverse account with the necessary privileges.')
          } else if (res.status === 422) {
            throw new Error('[422] Cannot process Subjects. Some of the selected Subjects might already be part of the target Subject Set.')
          }
          throw new Error('Workflow Output Store couldn\'t move() data')
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
    self.statusMessage = undefined

    const url = `${apiClient.root}/workflows/${workflowId}/retired_subjects`

    try {
      yield superagent
        .post(url)
        // .withCredentials()  // Do NOT use this after Dec 2019, due to changes with the Panoptes API.
        .set('Accept', 'application/vnd.api+json; version=1')
        .set('Authorization', apiClient.headers.Authorization)
        .set('Content-Type', 'application/json')
        .send({
          subject_ids: subjectIds,
          retirement_reason: 'other',
        })
        .then(res => {
           if (res.ok) return res.body
           throw new Error()
        })
        .catch(err => {
          const res = (err && err.response) || {}
          throw new Error('Workflow Output Store couldn\'t retire() data')
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

  create: flow(function * createAndMoveToSubjectSet (subjectIds = [], subjectSetName = '', projectId = '') {
    self.operation = 'create'
    self.status = ASYNC_STATES.SENDING
    self.statusMessage = undefined

    const url = `${apiClient.root}/subject_sets`

    try {
      const data = yield fetch(url, {
        method: 'POST',
        // credentials: 'include',  // Do not use, due to CORS issues
        headers: {
          'Accept': 'application/vnd.api+json; version=1',
          'Authorization': apiClient.headers.Authorization,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject_sets: {
            display_name: subjectSetName,
            links: {
              project: '16927',  // DEBUG
            },
          }
        }),
      }).then(res => {
        if (res.ok) return res.json()
        throw new Error('ML Results Store couldn\'t create a new Subject Set')
      })

      alert('DEBUG: a new Subject Set was created on Project 16927. This is a work in progress.')
      console.log('+++ data: ', data)

    } catch (err) {
      const message = err && err.toString() || undefined
      self.status = ASYNC_STATES.ERROR
      self.statusMessage = message
      console.error('[WorkflowOutputStore] ', err)
    }
  }),

}))

export { WorkflowOutputStore }
