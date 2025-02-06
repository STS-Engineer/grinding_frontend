import React, { createContext, useState, useEffect } from 'react';

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    console.log("Retrieved role from localStorage:", storedRole);  // Debugging step
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};
