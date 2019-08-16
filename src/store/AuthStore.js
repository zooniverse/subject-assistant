import { types } from 'mobx-state-tree'
import oauth from 'panoptes-client/lib/oauth'

import { ASYNC_STATES } from '@util'
import config from '@config'

const AuthStore = types.model('AuthStore', {
  
  status: types.optional(types.string, ASYNC_STATES.IDLE),
  user: types.frozen({}),
  
}).actions(self => {
  return {
    
    checkUser () {
      
      self.setStatus(ASYNC_STATES.FETCHING)
      // setTimeout(function () { self.setStatus(ASYNC_STATES.SUCCESS) }, 5000)
      
      oauth.checkCurrent()
      .then(user => {
        self.setStatus(ASYNC_STATES.SUCCESS)
        self.setUser(user)
      })

      
    },
    
    login () {
      
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

export { AuthStore }
