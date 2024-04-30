import React, { useState, useEffect } from 'react';
import { getAllFruits } from '../api/fruit/getAllFruits';


export function useFruits() {
    const [fruits, setFruits] = useState([]);
  
    const refreshFruits = () => {
      getAllFruits()
        .then(data => setFruits(data.filter(fruit => !fruit.archived)))
        .catch(errors => alert(errors));
    };
  
    useEffect(() => {
      refreshFruits();
    }, []);
  
    return fruits;
  }