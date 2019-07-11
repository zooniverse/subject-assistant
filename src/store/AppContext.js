import { createContext } from 'react'
import { AppStore  } from './AppStore.js'

const defaultContext = AppStore.create({
  displayName: 'Shaun',
  job: 'Developer',
})

export const AppContext = createContext(defaultContext)
