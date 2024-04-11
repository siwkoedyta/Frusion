import React from 'react';

export default function BoxesList({ boxes }) {
  return (
    <div>
      {boxes.map(box => (
        <div key={box.id} className='field' id={`field-${box.id}`}>
          <div className='field-content'>{box.name}</div>
          <div>{box.weight}</div>
        </div>
      ))}
    </div>
  );
}