// import React, { createContext, useState } from 'react';

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [userData, setUserData] = useState(null);

//   return (
//     <UserContext.Provider value={{ userData, setUserData }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    // Retrieve the initial state from localStorage
    const savedUserData = localStorage.getItem('userData');
    return savedUserData ? JSON.parse(savedUserData) : null;
  });

  // Persist userData to localStorage whenever it changes
  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    } else {
      localStorage.removeItem('userData');
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

