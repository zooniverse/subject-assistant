import { types } from 'mobx-state-tree'

const AppStore = types.model('AppStore', {
  displayName: types.string,
  job: types.string,  
}).actions(self => {
  return {
    setName (displayName) {
      console.log('+++ AppStore.setName: ', self.displayName, ' => ', displayName)
      self.displayName = displayName
      console.log(self.toJSON())
    },
  }
})

export { AppStore }
