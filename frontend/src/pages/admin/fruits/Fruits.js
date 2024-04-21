import FruitsList from './FruitsList.js';
import SetPrice from './SetPrice.js'
import AddFruit from './AddFruit.js'
import RemoveFruit from './RemoveFruit.js'
import React from 'react';
import WaveSmall from '../../../components/waveSmall/WaveSmall.js';
import HamburgerMenu from '../../../components/hamburgerMenu/hamburgerMenu.js';

export default function Fruits({ fruits, onUpdate }) {

  return (
    <div className='page'>
      <div className='mainContent' id='mainContentFruitBoxes'>
        <WaveSmall/>
        <div className='mainContentInsideContainer'>
          <div className='mainContentInside'>
            <div>
              <HamburgerMenu />
              <div className='featuredField featuredFieldTitleList'>Fruit</div>
              <FruitsList fruits={fruits} onUpdate={onUpdate} />
            </div>
            <div className='methods'>
              <SetPrice fruits={fruits} onUpdate={onUpdate}/>
              <AddFruit onUpdate={onUpdate}/>
              <RemoveFruit fruits={fruits} onUpdate={onUpdate}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}