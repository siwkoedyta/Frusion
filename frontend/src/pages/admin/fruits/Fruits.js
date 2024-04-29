import React from 'react';
import FruitsList from './FruitsList.js';
import SetPrice from './SetPrice.js';
import AddFruit from './AddFruit.js';
import RemoveFruit from './RemoveFruit.js';

export default function Fruits({ fruits, onUpdate}) {
  return (
    <div className='mainContentInsideContainer' id='mainContentFruitBoxes'>
      <div className='mainContentInside'>
        <div>
          <div className='featuredField featuredFieldTitleList'>Fruit</div>
          <FruitsList fruits={fruits} onUpdate={onUpdate} />
        </div>
        <div>
          <SetPrice fruits={fruits} onUpdate={onUpdate} />
          <AddFruit onUpdate={onUpdate} />
          <RemoveFruit fruits={fruits} onUpdate={onUpdate} />
        </div>
      </div>
    </div>
  );
}