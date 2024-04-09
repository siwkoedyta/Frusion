import React from 'react';

export default function FruitsList({ fruits }) {
  return (
    <div>
      {fruits.map(fruit => (
        <div key={fruit.id} className='field' id={`field-${fruit.id}`}>
          <div className='fruitName'>{fruit.name}</div>
          <div>{fruit.price}</div>
        </div>
      ))}
    </div>
  );
}