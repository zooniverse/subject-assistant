import { types } from 'mobx-state-tree'
import { ASYNC_STATES } from '@util'

const MLTaskStore = types.model('MLTaskStore', {
  
  status: types.optional(types.string, ASYNC_STATES.IDLE),
  data: types.optional(types.array(types.frozen({})), []),
  
}).actions(self => {
  return {
    
    setStatus (val) {
      self.status = val
    },
    
  }
})

export { MLTaskStore }
