import React from 'react'
import { AppStore  } from './AppStore.js'

const defaultContext = AppStore.create({
  displayName: '',
  job: '',
})

export const AppContext = React.createContext(defaultContext)
