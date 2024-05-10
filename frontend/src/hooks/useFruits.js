import React, { useState, useEffect } from 'react';
import { getAllFruits } from '../api/fruit/getAllFruits';
import { getAllFruitsClient } from '../api/fruit/getAllFruitsClient';

export function useFruits() {
    const [fruits, setFruits] = useState([]);

    async function refreshFruits(role) {
      if (role === 'ADMIN') {
        getAllFruits()
        .then(data => setFruits(data.filter(fruit => !fruit.archived)))
        .catch(errors => alert(errors))
      } else if(role === 'USER') {
        getAllFruitsClient()
        .then(data => setFruits(data.filter(fruit => !fruit.archived)))
        .catch(errors => alert(errors));
      }
    };
  
    return [fruits, refreshFruits];
  
}