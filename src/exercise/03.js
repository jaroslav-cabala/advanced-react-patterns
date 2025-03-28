// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import { Switch } from '../switch'

// 🐨 create your ToggleContext context here
// 📜 https://reactjs.org/docs/context.html#reactcreatecontext

const ToggleContext = React.createContext()
ToggleContext.displayName = "ToggleContext"

const useToggle = () => {
  const context = React.useContext(ToggleContext)
  if (!context) {
    throw new Error('useToggle must be used within <Toggle> component')
  }
  return context
}

function Toggle({ children }) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  const contextValue = {
    on, toggle
  }

  return <ToggleContext.Provider value={contextValue}>{children}</ToggleContext.Provider>
}

function ToggleOn({ children }) {
  const { on } = useToggle()

  return on ? children : null
}

function ToggleOff({ children }) {
  const { on } = useToggle()

  return on ? null : children
}

function ToggleButton({ ...props }) {
  const { on, toggle } = useToggle()

  return <Switch on={on} onClick={toggle} {...props} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
