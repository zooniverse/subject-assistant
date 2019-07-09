import React from 'react'
import { AppContext } from './store/AppContext'

class Form extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    return (
      <AppContext.Consumer>
        {(store) => (
          <form>
            <fieldset>
              <label>Name</label>
              <input
                type="text"
                value={store.name}
                onChange={e => store.setName(e.target.value) }
              />
            </fieldset>
            <fieldset>
              <label>Job</label>
              <input
                type="text"
                value={store.job}
                onChange={e => {}}
              />
            </fieldset>
          </form>
        )}
      </AppContext.Consumer>
    )
  }
}

export default Form
