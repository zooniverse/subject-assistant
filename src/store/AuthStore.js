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
    
    try {
      const user = yield oauth.checkCurrent()
      self.status = ASYNC_STATES.SUCCESS
      self.user = user
    } catch (err) {
      self.status = ASYNC_STATES.ERROR
    }
  }),

  login () {
    oauth.signIn(computeRedirectURL(window))
  },

  logout: flow(function * logout () {
    try {
      const user = yield oauth.signOut()
      self.user = user
    } catch (err) {
      self.status = ASYNC_STATES.ERROR
    }
  }),
}))

const computeRedirectURL = (window) => {
  const { location } = window;
  return location.origin ||
    `${location.protocol}//${location.hostname}:${location.port}`;
}

export { AuthStore }
