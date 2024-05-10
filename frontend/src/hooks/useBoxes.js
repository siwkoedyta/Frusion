
import React, { useState, useEffect } from 'react';
import { getAllBoxes } from '../api/box/getAllBoxes';
import { getAllBoxesClient } from '../api/box/getAllBoxesClient';

export function useBoxes() {
    const [boxes, setBoxes] = useState([]);
  
    async function refreshBoxes(role) {
      if (role === 'ADMIN') {
        getAllBoxes()
        .then(data => setBoxes(data.filter(box => !box.archived)))
        .catch(errors => alert(errors));
      } else if(role === 'USER') {
        getAllBoxesClient()
        .then(data => setBoxes(data.filter(box => !box.archived)))
        .catch(errors => alert(errors));
      }
    };
  
    return [boxes, refreshBoxes];
  }