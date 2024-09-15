
//-----------------------------
// import { useState } from 'react';

// export default function CounterForm(props)  {
//   const [value, setValue] = useState('');
//   const [clientErrors, setClientErrors] = useState({})
//   const errors = {}

//   const runClientValidation = () => {
//     if (value.trim().length === 0) {
//       errors.value = 'Value cannot be empty';
//     } else if (isNaN(value) || parseInt(value) < 0) {
//       errors.value = 'Value must be a non-negative number'
//     }
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     runClientValidation()
//     if (Object.keys(errors).length === 0) {
//       props.addCounter(parseInt(value))
//       setClientErrors({})
//       setValue('')
//     } else {
//       setClientErrors(errors)
//     }
//   }

//   return (
//     <div>
//       <h3>Add Counter</h3>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="value">Value:</label>
//         <input
//           type="number"
//           id="value"
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//         />
//         <button type="submit">Add Counter</button>
//         <br />
//         {clientErrors.value && <b style={{ color: 'red' }}>{clientErrors.value}</b>}
//       </form>
//     </div>
//   )
// }

//-----------------------------------
import React, { useState } from 'react';
import axios from 'axios';

export default function CounterForm({ addCounter }) {
  const [value, setValue] = useState('')
  const [clientErrors, setClientErrors] = useState({})

  const runClientValidation = () => {
    const errors = {}
    if (!value.trim()) {
      errors.value = 'Value cannot be empty';
    } else if (isNaN(value) || parseInt(value) < 0) {
      errors.value = 'Value must be a non-negative number'
    }
    setClientErrors(errors);
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!runClientValidation()) {
      return
    }
    const formData = {
      value: parseInt(value)
    }

    const userConfirm = window.confirm('Are you sure you want to add this counter?')
    if (userConfirm) {
      axios
        .post('http://localhost:5000/api/counters', formData)
        .then((response) => {
          addCounter(response.data)
          setValue('')
          setClientErrors({})
        })
        .catch((error) => console.error('Error adding counter:', error))
    }
  }

  return (
    <div>
      <h3>Add Counter</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="value">Value:</label>
        <input
          type="number"
          id="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Add Counter</button>
        <br />
        {clientErrors.value && <span style={{ color: 'red' }}>{clientErrors.value}</span>}
      </form>
    </div>
  )
}
