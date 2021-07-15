import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

const someReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENTE':
      return state++
    case 'DECREMENT':
      return state--
    default:
      return state
  }
}

const store = createStore(someReducer)

function App() {
  return (
    <div>
      {store.getState()}
      <header>
        <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>+</button>
        <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>-</button>
      </header>
    </div>
  )
}

export default App
const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
