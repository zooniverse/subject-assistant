import React, { useContext } from 'react'
import { observer } from 'mobx-react'

import AppContext from '@store'

function Debugger () {
  const store = useContext(AppContext)
  const ur = store.userResources
  return (
    <article className="debugger">
      <h2>Debugger</h2>
      <h3>Owned Projects</h3>
      {ur.ownedProjects.map((project, index) =>
        <div key={`user-project-${index}`}>
          {project.id} / {project.display_name}
        </div>
      )}
    </article>
  )
}

export default observer(Debugger)
