import React from 'react'

export const APP_CONTEXT_INITIAL_DATA = {
  name: 'Anon',
  job: 'freelancer',
}

export const AppContext = React.createContext(APP_CONTEXT_INITIAL_DATA)
