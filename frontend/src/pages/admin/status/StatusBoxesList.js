import React from 'react';


export default function StatusBoxesList({ summaryTransactions }) {
  return (
    <div>
      {summaryTransactions && summaryTransactions.map(transaction => (
        <div key={transaction.boxId} id={`${transaction.boxId}`}>
          {transaction.boxes.map((box, index) => (
            <div key={index} className={`field statusField`} id={`${transaction.boxId}-${index}`}>
              <div>{box.name}</div>
              <div>{box.quantity}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}