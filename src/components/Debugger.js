import React, { useContext } from 'react'
import { observer } from 'mobx-react'

import AppContext from '@store'

function Debugger () {
  const store = useContext(AppContext)
  return (
    <article className="debugger">
      <h2>Debugger</h2>
    </article>
  )
}

export default observer(Debugger)
