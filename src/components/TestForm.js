import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import AppContext from '@store'

function TestForm() {
  const store = useContext(AppContext)
  return (
    <form>
      <fieldset>
        <label>Username</label>
        <input
          type="text"
          defaultValue={store.user}
          onChange={e => store.setUser(e.target.value) }
        />
      </fieldset>
    </form>
  )
}

export default observer(TestForm)
