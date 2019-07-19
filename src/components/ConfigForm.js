import React, { useContext } from 'react'
import config from '@config'

const MESSAGE = {
  DEFAULT: 'Use this form to change the configuration settings for the app.',
  CHANGED: 'Changes made. Please reload the app.',
  RESET: 'Config values have been reset. Please reload the app.',
}

class ConfigForm extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = {
      message: MESSAGE.DEFAULT,
    }
  }
  
  render () {
    const state = this.state;
    
    return (
      <form className="form">
        <h2>App Config</h2>
        <p>{state.message}</p>
      
        {Object.keys(config).map((key) => {
          return (
            <fieldset key={key}>
              <legend>{key}</legend>
              <div className="flex-row">
                <input
                  className="long text input flex-item grow"
                  defaultValue={config[key]}
                  onChange={(e) => {
                    localStorage.setItem(key, e.target.value)
                    this.setState({ message: MESSAGE.CHANGED })
                  }}
                />
              </div>
            </fieldset>
          )
        })}
  
        <div className="action panel">
          <button
            className="danger button"
            onClick={() => {
              Object.keys(config).map((key) => {
                localStorage.removeItem(key)
                this.setState({ message: MESSAGE.RESET })
              })
            }}
          >
            Reset
          </button>
        </div>
      </form>
    )
  }
}

export default ConfigForm
