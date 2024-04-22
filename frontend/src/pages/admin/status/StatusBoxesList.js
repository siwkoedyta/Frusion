import React from 'react';

export default function StatusBoxesList({ summaryTransactions }) {
  const boxSums = {};

  summaryTransactions.forEach(transaction => {
    transaction.boxes.forEach(box => {
      const key = box.name;

      if (boxSums.hasOwnProperty(key)) {
        boxSums[key] += box.quantity;
      } else {
        boxSums[key] = box.quantity;
      }
    });
  });

  return (
    <div className='inputGap'>
      {Object.keys(boxSums).map(name => (
        <div key={name} id={name}>
          <div className="field statusField">
            <div>{name}</div>
            <div>{boxSums[name]}</div>
          </div>
        </div>
      ))}
    </div>
  );
}