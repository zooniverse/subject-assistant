import { types } from 'mobx-state-tree'

const AppStore = types.model('AppStore', {
  name: types.string,
  job: types.string,  
})

export default AppStore