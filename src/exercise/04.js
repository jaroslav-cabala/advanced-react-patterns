// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import { Switch } from '../switch'

function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  const getToggleProps = (customProps) => {
    const customPropsWithoutOnclick = Object.fromEntries(Object.entries(customProps).filter(([key, value]) => key !== 'onClick'))

    const props = {
      'aria-pressed': on,
      onClick: () => {
        customProps.onClick?.();
        toggle()
      },
      ...customPropsWithoutOnclick
    }
    return props;
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
