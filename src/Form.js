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
          defaultValue={props.name}
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

class FormContainer extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    return (
      <AppContext.Consumer>
        {(store) => {
          console.log('Form context', store)
          return <ObservableForm name={store.name} job={store.job} onChange={store.setName} />
        }}
      </AppContext.Consumer>
    )
  }
}

export default FormContainer
