// State Reducer
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
import { Switch } from '../switch'

const callAll = (...fns) => (...args) => fns.forEach(fn => fn?.(...args))

const toggleActionTtypes = {
  toggle: 'toggle',
  reset: 'reset'
}

function toggleReducer(state, { type, initialState }) {
  switch (type) {
    case toggleActionTtypes.toggle: {
      return { on: !state.on }
    }
    case toggleActionTtypes.reset: {
      return initialState
    }
    default: {
      throw new Error(`Unsupported type: ${type}`)
    }
  }
}

function useToggle({ reducer = toggleReducer, initialOn = false } = {}) {
  const { current: initialState } = React.useRef({ on: initialOn })
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const { on } = state

  const toggle = () => dispatch({ type: toggleActionTtypes.toggle })
  const reset = () => dispatch({ type: toggleActionTtypes.reset, initialState })

  function getTogglerProps({ onClick, ...props } = {}) {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    }
  }

  function getResetterProps({ onClick, ...props } = {}) {
    return {
      onClick: callAll(onClick, reset),
      ...props,
    }
  }

  return {
    on,
    reset,
    toggle,
    getTogglerProps,
    getResetterProps,
  }
}

function App() {
  const [timesClicked, setTimesClicked] = React.useState(0)
  const clickedTooMuch = timesClicked >= 4

  function toggleStateReducer(state, action) {
    const defaultStateReducer = toggleReducer(state, action);

    if (action.type === toggleActionTtypes.toggle && clickedTooMuch) {
      return { ...defaultStateReducer, on: state.on }
    }
    return defaultStateReducer;
  }

  const { on, getTogglerProps, getResetterProps } = useToggle({
    reducer: toggleStateReducer,
  })

  return (
    <div>
      <Switch
        {...getTogglerProps({
          disabled: clickedTooMuch,
          on: on,
          onClick: () => setTimesClicked(count => count + 1),
        })}
      />
      {clickedTooMuch ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : timesClicked > 0 ? (
        <div data-testid="click-count">Click count: {timesClicked}</div>
      ) : null}
      <button {...getResetterProps({ onClick: () => setTimesClicked(0) })}>
        Reset
      </button>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
