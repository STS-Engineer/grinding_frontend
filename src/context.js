import React, { createContext, useContext, useState } from 'react';

// Create Context
const ShiftContext = createContext();

// Context Provider
export const ShiftProvider = ({ children }) => {
  const [currentshift, setCurrentshift] = useState('shift1');

  return (
    <ShiftContext.Provider value={{ currentshift, setCurrentshift }}>
      {children}
    </ShiftContext.Provider>
  );
};

// Custom Hook to use context
export const useShift = () => useContext(ShiftContext);
