import React from 'react'
import { observer } from 'mobx-react'
import { AppContext } from './store/AppContext'

function Form(props) {
  console.log('Form', props)
  return (
    <form>
      <fieldset>
        <label>Name</label>
        <input
          type="text"
          defaultValue={props.displayName}
          onChange={e => props.onChange(e.target.value) }
        />
      </fieldset>
      <fieldset>
        <label>Job</label>
        <input
          type="text"
          defaultValue={props.job}
          onChange={e => {}}
        />
      </fieldset>
    </form>
  )
}

const ObservableForm = observer(Form)

class FormContainer extends React.PureComponent {
  constructor (props) {
    super(props)
  }
  
  render () {
    console.log('Form context', this.context)
    const { displayName, job, setName } = this.context
    return <ObservableForm displayName={displayName} job={job} onChange={setName} />
  }
}
FormContainer.contextType = AppContext

export default FormContainer
