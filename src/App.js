
// //----------------------------------------
// import React, { useEffect, useReducer } from 'react';
// import axios from 'axios';
// import CounterList from './CounterList';

// const initialState = {
//   counters: []
// }

// const reducer = (state, action) => {
//   if (action.type === 'FETCH_COUNTERS') {
//     return { counters: action.payload }
//   } else if (action.type === 'ADD_COUNTER') {
//     return { counters: [...state.counters, action.payload] }
//   } else if (action.type === 'UPDATE') {
//     return {
//       counters: state.counters.map((counter) =>
//         counter._id === action.payload._id ? action.payload : counter
//       )
//     }
//   } else if (action.type === 'DELETE_COUNTER') {
//     return {
//       counters: state.counters.filter((counter) => counter._id !== action.payload)
//     }
//   } else {
//     return state
//   }
// }

// export default function App() {
//   const [state, dispatch] = useReducer(reducer, initialState)

//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/api/counters')
//       .then((response) => {
//         dispatch({ type: 'FETCH_COUNTERS', payload: response.data })
//       })
//       .catch((error) => console.error('Error fetching counters:', error))
//   }, [])

//   const addCounter = (value) => {
//     axios
//       .post('http://localhost:5000/api/counters', { value })
//       .then((response) => {
//         dispatch({ type: 'ADD_COUNTER', payload: response.data })
//       })
//       .catch((error) => console.error('Error adding counter:', error))
//   }

//   const updateCounter = (id, value) => {
//     axios
//       .put(`http://localhost:5000/api/counters/${id}`, { value })
//       .then((response) => {
//         dispatch({ type: 'UPDATE', payload: response.data })
//       })
//       .catch((error) => console.error('Error updating counter:', error))
//   }

//   const deleteCounter = (id) => {
//     axios
//       .delete(`http://localhost:5000/api/counters/${id}`)
//       .then(() => {
//         dispatch({ type: 'DELETE_COUNTER', payload: id })
//       })
//       .catch((error) => console.error('Error deleting counter:', error))
//   }

//   return (
//     <div>
//       <h1>Counter Application</h1>
//       <CounterList
//         counters={state.counters}
//         addCounter={addCounter}
//         updateCounter={updateCounter}
//         deleteCounter={deleteCounter}
//       />
//     </div>
//   )
// }
////---------------------------------------------------
import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import CounterList from './CounterList';
import CounterForm from './CounterForm';

const initialState = {
  counters: []
}

const reducer = (state, action) => {
  if (action.type === 'FETCH_COUNTERS') {
    return { counters: action.payload }
  } else if (action.type === 'ADD_COUNTER') {
    return { counters: [...state.counters, action.payload] }
  } else if (action.type === 'UPDATE') {
    return {
      counters: state.counters.map((counter) =>
        counter._id === action.payload._id ? action.payload : counter
      )
    }
  } else if (action.type === 'DELETE_COUNTER') {
    return {
      counters: state.counters.filter((counter) => counter._id !== action.payload)
    }
  } else {
    return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/counters')
      .then((response) => {
        dispatch({ type: 'FETCH_COUNTERS', payload: response.data })
      })
      .catch((error) => console.error('Error fetching counters:', error))
  }, [])

  const updateCounter = (id, value) => {
    axios
      .put(`http://localhost:5000/api/counters/${id}`, { value })
      .then((response) => {
        dispatch({ type: 'UPDATE', payload: response.data })
      })
      .catch((error) => console.error('Error updating counter:', error))
  }

  const deleteCounter = (id) => {
    axios
      .delete(`http://localhost:5000/api/counters/${id}`)
      .then(() => {
        dispatch({ type: 'DELETE_COUNTER', payload: id })
      })
      .catch((error) => console.error('Error deleting counter:', error))
  }

  return (
    <div>
      <h1>Counter Application</h1>
      <CounterForm addCounter={(counter) => dispatch({ type: 'ADD_COUNTER', payload: counter })} />
      <CounterList
        counters={state.counters}
        updateCounter={updateCounter}
        deleteCounter={deleteCounter}
      />
    </div>
  )
}
