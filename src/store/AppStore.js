import { types } from 'mobx-state-tree'

const AppStore = types.model('AppStore', {
  name: types.string,
  job: types.string,  
}).actions(self => {
  return {
    setName (name) {
      console.log('+++ AppStore.setName: ', name, ' => ', self.name)
      self.name = name
    },
  }
})

const appStore = AppStore.create({
  name: 'Azlan',
  job: 'Ranger',
})

export { AppStore, appStore }
