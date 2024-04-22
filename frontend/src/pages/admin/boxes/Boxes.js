import React from 'react';
import BoxesList from './BoxesList'
import RemoveBox from './RemoveBox'
import AddBox from './AddBox'

export default function Boxes({ boxes, onUpdate }) {

  return (
    <div className='mainContentInsideContainer' id='mainContentFruitBoxes'>
      <div className='mainContentInside'>
        <div>
          <div className='featuredField featuredFieldTitleList'>Boxes</div>
            <BoxesList boxes={boxes} onUpdate={onUpdate}/>
          </div>
        <div>
          <AddBox onUpdate={onUpdate}/>
          <RemoveBox boxes={boxes} onUpdate={onUpdate}/>
        </div>
      </div>
    </div>
  );
}

