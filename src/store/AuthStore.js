import { types } from 'mobx-state-tree'
import oauth from 'panoptes-client/lib/oauth'

import { ASYNC_STATES } from '@util'
import config from '@config'

const AuthStore = types.model('AuthStore', {
  
  status: types.optional(types.string, ASYNC_STATES.IDLE),
  user: types.frozen({}),
  
}).actions(self => {
  return {
    
    initialise () {
      oauth.init(config.panoptesAppId)
      .then(() => {
        self.checkUser()
      })
      .catch(err => {
        console.error(err)
      })
    },
    
    checkUser () {
      
      self.setStatus(ASYNC_STATES.FETCHING)
      
      oauth.checkCurrent()
      .then(user => {
        self.setStatus(ASYNC_STATES.SUCCESS)
        self.setUser(user)
      })
      
    },
    
    login () {
      oauth.signIn(computeRedirectURL(window))
    },
    
    logout () {
      
    },
    
    setStatus (val) {
      self.status = val
    },
    
    setUser (val) {
      self.user = val
    },
  }
})

const computeRedirectURL = (window) => {
  const { location } = window;
  return location.origin ||
    `${location.protocol}//${location.hostname}:${location.port}`;
}

export { AuthStore }
