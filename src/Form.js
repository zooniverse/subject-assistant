import React from 'react'

class Form extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    return (
      <form>
        <fieldset>
          <label>Name</label>
          <input type="text" />
        </fieldset>
        <fieldset>
          <label>Job</label>
          <input type="text" />
        </fieldset>
      </form>
    )
  }
}

export default Form
