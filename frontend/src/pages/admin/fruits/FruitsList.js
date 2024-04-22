import React from 'react';

export default function FruitsList({ fruits }) {
  return (
    <div className='inputGap'>
      {fruits.map(fruit => (
        <div key={fruit.id} className='field listField' id={`field-${fruit.id}`}>
          <div>{fruit.name}</div>
          <div className='dataSmallerField'>
            <div>{fruit.price.toFixed(2)}</div>&nbsp;zł
          </div>
        </div>
      ))}
    </div>
  );
}