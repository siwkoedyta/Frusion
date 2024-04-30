
import React, { useState, useEffect } from 'react';
import { getAllClients } from '../api/client/getAllClients';

export function useClients() {
    const [clients, setClients] = useState([]);
  
    const refreshClients = () => {
      getAllClients()
        .then(data => setClients(data.filter(client => !client.archived)))
        .catch(errors => alert(errors));
    };
  
    useEffect(() => {
      refreshClients();
    }, []);
  
    return clients;
  }