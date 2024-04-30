import { useEffect } from 'react';
import { getAllFruits } from '../api/fruit/getAllFruits';
import { getAllBoxes } from '../api/box/getAllBoxes';
import { getAllClients } from '../api/client/getAllClients';
import { getAllBoxesClient } from '../api/box/getAllBoxesClient';
import { getAllFruitsClient } from '../api/fruit/getAllFruitsClient';

export function useDataFetch(role, setFruits, setBoxes, setClients) {
  useEffect(() => {
    async function fetchData() {
      try {
        if (role === 'ADMIN') {
          await Promise.all([
            getAllFruits().then(data => setFruits(data.filter(fruit => !fruit.archived))),
            getAllBoxes().then(data => setBoxes(data.filter(box => !box.archived))),
            getAllClients().then(data => setClients(data.filter(client => !client.archived)))
          ]);
        } else if (role === 'USER') {
          await Promise.all([
            getAllFruitsClient().then(data => setFruits(data.filter(fruit => !fruit.archived))),
            getAllBoxesClient().then(data => setBoxes(data.filter(box => !box.archived)))
          ]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    if (role) {
      fetchData();
    }
  }, [role, setFruits, setBoxes, setClients]);
}