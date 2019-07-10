import { types } from 'mobx-state-tree'

const AppStore = types.model('AppStore', {
  name: types.string,
  job: types.string,  
}).actions(self => {
  return {
    setName (name) {
      console.log('+++ AppStore.setName: ', self.name, ' => ', name)
      self.name = name
      console.log(self.toJSON())
    },
  }
})

export { AppStore }
