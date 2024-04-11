import FruitsList from './FruitsList.js';
import SetPrice from './SetPrice.js'
import AddFruit from './AddFruit.js'
import RemoveFruit from './RemoveFruit.js'
import React, { useState, useEffect } from 'react';
import './Fruit.css'
import { getAllFruits } from '../../../api/fruit/getAllFruits.js';


export default function Fruits() {
  const [fruits, setFruits] = useState([]);

  useEffect(() => refreshFruits(), []);

  const refreshFruits = () => {
    getAllFruits()
        .then(data => setFruits(data.filter(fruit => !fruit.archived)))
        .catch(errors => alert(errors));
  }

  return (
    <div className='page'>
      <div className='mainContent' id='mainContentFruitBoxes'>
        <div>
            <div className='featuredField' id='featuredFieldTitleList'>Fruit</div>
            <FruitsList fruits={fruits} onUpdate={refreshFruits} />
        </div>
        <div>
            <SetPrice fruits={fruits} onUpdate={refreshFruits}/>
            <AddFruit onUpdate={refreshFruits}/>
            <RemoveFruit fruits={fruits} onUpdate={refreshFruits}/>
        </div>
      </div>
    </div>
  );
}