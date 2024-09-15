// //---------------------------------------------
// import React from 'react';
// import Counter from './Counter';
// import CounterForm from './CounterForm';

// export default function CounterList(props) {
//   return (
//     <div>
//       <CounterForm addCounter={props.addCounter} />
//       {props.counters.map((counter, index) => (
//   <Counter
//     key={counter._id}  // Use counter._id as the key
//     counter={{ ...counter, index: index + 1 }}
//     updateCounter={props.updateCounter}
//     deleteCounter={props.deleteCounter}
//   />
// ))}
// </div>
// )
// }
///-------------------------------------------------
import React from 'react';
import Counter from './Counter';

export default function CounterList({ counters, updateCounter, deleteCounter }) {
  return (
    <div>
      {counters.map((counter, index) => (
        <Counter
          key={counter._id}
          counter={{ ...counter, index: index + 1 }}
          updateCounter={updateCounter}
          deleteCounter={deleteCounter}
        />
      ))}
    </div>
  )
}
