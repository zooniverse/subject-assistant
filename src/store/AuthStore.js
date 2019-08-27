import { flow, types } from 'mobx-state-tree'
import oauth from 'panoptes-client/lib/oauth'

import { ASYNC_STATES } from '@util'

const AuthStore = types.model('AuthStore', {
  
  status: types.optional(types.string, ASYNC_STATES.IDLE),
  user: types.optional(types.frozen({}), null),  // When uninitialised, user should be null instead of {}
  
}).actions(self => ({
  
  initialise () {
    self.checkUser()
  },

  checkUser: flow(function * checkUser () {
    self.status = ASYNC_STATES.FETCHING
    oauth.checkCurrent()
    .then(user => {
      self.status = ASYNC_STATES.SUCCESS
      self.user = user
    })
  }),

  login () {
    oauth.signIn(computeRedirectURL(window))
  },

  logout: flow(function* () {
    oauth.signOut()
    .then(user => {
      self.user = user
    })
  }),

  setStatus (val) {
    self.status = val
  },

  setUser (val) {
    self.user = val
  },
}))

const computeRedirectURL = (window) => {
  const { location } = window;
  return location.origin ||
    `${location.protocol}//${location.hostname}:${location.port}`;
}

export { AuthStore }
