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
      {ur.ownedProjects.map((item, index) =>
        <div key={`user-project-${index}`}>
          {item.id} / {item.display_name}
        </div>
      )}
      <h3>Owned Workflows</h3>
      {ur.ownedWorkflows.map((item, index) =>
        <div key={`user-workflow-${index}`}>
          {item.id} / {item.display_name}
        </div>
      )}
      <h3>Owned Subject Sets</h3>
      {ur.ownedSubjectSets.map((item, index) =>
        <div key={`user-subjectset-${index}`}>
          {item.id} / {item.display_name}
        </div>
      )}
    </article>
  )
}

export default observer(Debugger)
