import React from 'react';

export default function StatusAmmountList({ summaryTransactions }) {
  return (
    <div className='inputGap'>
      {summaryTransactions && summaryTransactions.map(transaction => (
        <div key={transaction.fruitId} id={`${transaction.fruitId}`}>
          <div className='field statusField' id={`${transaction.fruitId}`}>
            <div>{transaction.fruitName}</div>
            <div className='dataSmallerField'>
              <div>{transaction.sumAmount.toFixed(2)}</div>&nbsp;zł
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}