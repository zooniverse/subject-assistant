import { types } from 'mobx-state-tree'

const MLSelectionStore = types.model('MLSelectionStore', {
  
  data: types.optional(types.array(types.frozen({})), []),
  
}).actions(self => {
  return {
    
    reset () {
      self.data = []
    },
    
    setData (val) {
      self.data = val
    },
    
  }
})

export { MLSelectionStore }
