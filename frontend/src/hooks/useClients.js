
import React, { useState, useEffect } from 'react';
import { getAllClients } from '../api/client/getAllClients';

export function useClients() {
    const [clients, setClients] = useState([]);


    async function refreshClients(role) {
      if (role === 'ADMIN') {
        getAllClients()
        .then(data => setClients(data.filter(client => !client.archived)))
        .catch(errors => alert(errors));
      }
    };
  
    return [clients, refreshClients];
  }