import { createContext } from 'react'
import { AppStore  } from './AppStore.js'

const defaultContext = AppStore.create({})  // Default values can be specified here, or within the stores themselves using types.optional()

const AppContext = createContext(defaultContext)

export default AppContext
