import { types } from 'mobx-state-tree'
import { AuthStore } from './AuthStore'
import { MLTaskStore } from './MLTaskStore'
import { MLResultsStore } from './MLResultsStore'
import { MLSelectionStore } from './MLSelectionStore'
import { WorkflowOutputStore } from './WorkflowOutputStore'
import { UserResourcesStore } from './UserResourcesStore'

const DEMO_MODE_STORAGE_KEY = 'demoMode'

const AppStore = types.model('AppStore', {
  
  initialised: types.optional(types.boolean, false),
  demoMode: types.optional(types.boolean, localStorage.getItem(DEMO_MODE_STORAGE_KEY) === 'yes'),
  
  auth: types.optional(AuthStore, () => AuthStore.create({})),
  
  userResources: types.optional(UserResourcesStore, () => UserResourcesStore.create({})),
  
  mlTask: types.optional(MLTaskStore, () => MLTaskStore.create({})),  // We can use {} to set the initial values of a store
  mlResults: types.optional(MLResultsStore, () => MLResultsStore.create({})),
  mlSelection: types.optional(MLSelectionStore, () => MLSelectionStore.create({})),
  
  workflowOutput: types.optional(WorkflowOutputStore, () => WorkflowOutputStore.create({})),
  
}).actions(self => ({
  
  toggleDemoMode () {
    self.demoMode = !self.demoMode
    localStorage.setItem(DEMO_MODE_STORAGE_KEY, (self.demoMode) ? 'yes' : 'no')
  },

}))

export { AppStore }
