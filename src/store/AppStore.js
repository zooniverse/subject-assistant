import { types } from 'mobx-state-tree'

const AppStore = types.model('AppStore', {
  user: types.optional(types.string, 'Anonymous'),
  
}).actions(self => {
  return {
    setUser (val) {
      self.user = val
    },
  }
})

export { AppStore }
