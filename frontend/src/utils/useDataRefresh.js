import { useState, useEffect } from 'react';
import { getAllFruits } from './api/fruit/getAllFruits';
import { getAllBoxes } from './api/box/getAllBoxes';
import { getAllClients } from './api/client/getAllClients';

const useDataRefresh = (selectedDate, role) => {
  const [data, setData] = useState({ fruits: [], boxes: [], clients: [] });

  useEffect(() => {
    const refreshData = async () => {
      try {
        let fruitsData = [];
        let boxesData = [];
        let clientsData = [];

        if (role === 'ADMIN') {
          fruitsData = await getAllFruits();
          boxesData = await getAllBoxes();
          clientsData = await getAllClients();
        }

        setData({ fruits: fruitsData, boxes: boxesData, clients: clientsData });
      } catch (error) {
        console.error('Error refreshing data:', error);
        alert('Error refreshing data. Please try again later.');
      }
    };

    refreshData();
  }, [selectedDate, role]);

  return data;
};

export default useDataRefresh;