import { types } from 'mobx-state-tree'
import { MLTaskStore } from './MLTaskStore'
import { MLResultsStore } from './MLResultsStore'
import { MLSelectionStore } from './MLSelectionStore'

const AppStore = types.model('AppStore', {
  
  demoMode: types.optional(types.boolean, false),
  user: types.optional(types.string, 'Anonymous'),
  
  mlTask: types.optional(MLTaskStore, {}),  // We can use {} to set the initial values of a store
  mlResults: types.optional(MLResultsStore, {}),
  mlSelection: types.optional(MLSelectionStore, {}),
  
}).actions(self => {
  return {
    
    setUser (val) {
      self.user = val
    },
    
    toggleDemoMode () {
      self.demoMode = !self.demoMode
    },
    
  }
})

export { AppStore }
