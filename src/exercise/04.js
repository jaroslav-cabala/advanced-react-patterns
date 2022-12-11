// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import { Switch } from '../switch'

const callAll = (...functions) => (...args) => functions.forEach(fn => fn?.(args))

function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  const getToggleProps = ({ onClick, ...props } = {}) => {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props
    }
  }

  return { on, toggle, getToggleProps }
}

function App() {
  const { on, getToggleProps } = useToggle()
  return (
    <div>
      <Switch {...getToggleProps({ on })} />
      <hr />
      <button
        {...getToggleProps({ onClick: () => console.info('onButtonClick'), 'aria-label': "custom-button", id: 'custom-button-id', })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
