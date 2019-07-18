import { createContext } from 'react'
import { AppStore  } from './AppStore.js'

const defaultContext = AppStore.create({
  displayName: 'Shaun',
  job: 'Developer',
})

const AppContext = createContext(defaultContext)

export default AppContext
