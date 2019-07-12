import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { AppContext } from './store/AppContext'

function Form() {
  const store = useContext(AppContext)
  return (
    <form>
      <fieldset>
        <label>Name</label>
        <input
          type="text"
          defaultValue={store.displayName}
          onChange={e => store.setName(e.target.value) }
        />
      </fieldset>
      <fieldset>
        <label>Job</label>
        <input
          type="text"
          defaultValue={store.job}
          onChange={e => {}}
        />
      </fieldset>
    </form>
  )
}

export default observer(Form)
