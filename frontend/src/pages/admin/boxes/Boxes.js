
import BoxesList from './BoxesList'
import RemoveBox from './RemoveBox'
import AddBox from './AddBox'
import { getAllBoxes } from '../../../api/box/getAllBoxes';
import React, { useState, useEffect } from 'react';


export default function Boxes() {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => refreshBoxes(), []);

  const refreshBoxes = () => {
    getAllBoxes()
        .then(data => setBoxes(data.filter(box => !box.archived)))
        .catch(errors => alert(errors));
  }

  return (
    <div className='page'>
      <div className='mainContent' id='mainContentFruitBoxes'>
        <div>
            <div className='featuredField' id='featuredFieldTitleList'>Boxes</div>
            <BoxesList boxes={boxes} onUpdate={refreshBoxes}/>
        </div>
        <div>
            <AddBox onUpdate={refreshBoxes}/>
            <RemoveBox boxes={boxes} onUpdate={refreshBoxes}/>
        </div>
      </div>
    </div>
  );
}