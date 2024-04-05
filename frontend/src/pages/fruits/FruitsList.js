import './FruitsList.css'
import React from 'react';

export default function FruitsList({ fruits }) {
  return (
    <div>
      <div>
        {fruits.map(fruit => (
          <div key={fruit.id} className='field' id={`field-${fruit.id}`}>
            <div >{fruit.name}</div>
            <div >{fruit.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}