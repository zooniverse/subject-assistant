import { types } from 'mobx-state-tree'
import { MLTaskStore } from './MLTaskStore'

const AppStore = types.model('AppStore', {
  
  user: types.optional(types.string, 'Anonymous'),  
  mlTask: types.optional(MLTaskStore, {})  // We can use {} to set the initial values of a store
  
}).actions(self => {
  return {
    
    setUser (val) {
      self.user = val
    },
    
  }
})

export { AppStore }
