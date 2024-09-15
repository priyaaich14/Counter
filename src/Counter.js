// //------------------------------
// import React, { useReducer, useEffect } from 'react';

// const reducer = (state, action) => {
//   if (action.type === 'INCREMENT') {
//     return state + 1
//   } else if (action.type === 'DECREMENT') {
//     return state - 1
//   } else if (action.type === 'RESET') {
//     return 0
//   } else if (action.type === 'UPDATE') {
//     return action.payload
//   } else {
//     return state
//   }
// }

// export default function Counter(props)  {
//   const [value, localDispatch] = useReducer(reducer, props.counter.value)

//   useEffect(() => {
//     localDispatch({ type: 'UPDATE', payload: props.counter.value })
//   }, [props.counter.value])

//   const handleIncrement = () => {
//     const newValue = value + 1
//     localDispatch({ type: 'INCREMENT' })
//     props.updateCounter(props.counter._id, newValue)
//   }

//   const handleDecrement = () => {
//     const newValue = value - 1
//     localDispatch({ type: 'DECREMENT' })
//     props.updateCounter(props.counter._id, newValue)
//   }

//   const handleReset = () => {
//     localDispatch({ type: 'RESET' })
//     props.updateCounter(props.counter._id, 0)
//   }

//   const handleUpdate = () => {
//     const newValue = prompt('Enter the new value:')
//     if (newValue !== null && !isNaN(newValue)) {
//       const intValue = parseInt(newValue)
//       localDispatch({ type: 'UPDATE', payload: intValue })
//       props.updateCounter(props.counter._id, intValue)
//     }
//   }

//   const handleDelete = () => {
//     // Dispatch DELETE_COUNTER action
//     const userConfirm = prompt("Are you Sure?")
//     if(userConfirm){
//     localDispatch({ type: 'DELETE_COUNTER' })
//   // Make API call to delete the counter from the backend
//     props.deleteCounter(props.counter._id)
//   }
//   }
//   return (
//     <div>
//       <h3>Counter {props.counter.index}</h3>
//       <p>Value: {value}</p>
//       <button onClick={handleIncrement}>Increment</button>
//       <button onClick={handleDecrement}>Decrement</button>
//       <button onClick={handleReset}>Reset</button>
//       <button onClick={handleUpdate}>Update</button>
//       <button onClick={handleDelete}>Delete</button>
//     </div>
//   )
// }


//--------------------------------------

import React from 'react';

export default function Counter({ counter, updateCounter, deleteCounter }) {
  const handleIncrement = () => {
    updateCounter(counter._id, counter.value + 1)
  }
  const handleDecrement = () => {
    updateCounter(counter._id, counter.value - 1)
  }

  const handleReset = () => {
    updateCounter(counter._id, 0)
  }

  const handleUpdate = () => {
    const newValue = prompt('Enter the new value:')
    if (newValue !== null && !isNaN(newValue)) {
      updateCounter(counter._id, parseInt(newValue))
    }
  }

  
  const handleDelete = () => {
    const userConfirm = prompt("Are you sure you want to delete this counter? Type 'yes' to confirm.")
    if (userConfirm === 'yes') {
      // Make API call to delete the counter from the backend
      deleteCounter(counter._id)
    }
  }
  
  return (
    <div>
      <h3>Counter {counter.index}</h3>
      <p>Value: {counter.value}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

