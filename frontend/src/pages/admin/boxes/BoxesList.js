import React from 'react';

export default function BoxesList({ boxes }) {
  return (
    <div className='inputGap'>
      {boxes.map(box => (
        <div key={box.id} className='field listField' id={`field-${box.id}`}>
          <div>{box.name}</div>
          <div className='dataSmallerField'>
            <div>{box.weight.toFixed(2)}</div>&nbsp;kg
          </div>
        </div>
      ))}
    </div>
  );
}