import React from 'react'
import { AppContext } from './store/AppContext'

class Form extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    return (
      <form>
        <fieldset>
          <label>Name</label>
          <input type="text" value={this.context.name} />
        </fieldset>
        <fieldset>
          <label>Job</label>
          <input type="text" value={this.context.job} />
        </fieldset>
      </form>
    )
  }
}

Form.contextType = AppContext

export default Form
