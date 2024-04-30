
import React, { useState, useEffect } from 'react';
import { getAllBoxes } from '../api/box/getAllBoxes';

export function useBoxes() {
    const [boxes, setBoxes] = useState([]);
  
    const refreshBoxes = () => {
      getAllBoxes()
        .then(data => setBoxes(data.filter(box => !box.archived)))
        .catch(errors => alert(errors));
    };
  
    useEffect(() => {
      refreshBoxes();
    }, []);
  
    return boxes;
  }