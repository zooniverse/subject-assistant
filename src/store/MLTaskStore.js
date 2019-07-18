import { types } from 'mobx-state-tree'

const MLTaskStore = types.model('MLTaskStore', {
  
  status: types.optional(types.string, 'idle'),
  data: types.optional(types.array(types.frozen({})), []),
  
}).actions(self => {
  return {
    
    setStatus (val) {
      self.status = val
    },
    
  }
})

export { MLTaskStore }
