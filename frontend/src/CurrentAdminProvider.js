import React, { createContext, useState, useContext } from 'react';

const CurrentAdminContext = createContext(null);

export const CurrentAdminProvider = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState(null);

  return (
    <CurrentAdminContext.Provider value={{ currentAdmin, setCurrentAdmin }}>
      {children}
    </CurrentAdminContext.Provider>
  );
};

export const useCurrentAdmin = () => useContext(CurrentAdminContext);