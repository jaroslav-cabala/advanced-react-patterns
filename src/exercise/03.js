// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import { Switch } from '../switch'

// 🐨 create your ToggleContext context here
// 📜 https://reactjs.org/docs/context.html#reactcreatecontext

const ToggleContext = React.createContext()

const ToggleContextProvider = ({ children }) => {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  const contextValue = {
    on, toggle
  }

  return <ToggleContext.Provider value={contextValue}>{children}</ToggleContext.Provider>
}

const useToggle = () => {
  return React.useContext(ToggleContext)
}

function Toggle({ children }) {
  return <ToggleContextProvider>
    {children}
  </ToggleContextProvider>
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
