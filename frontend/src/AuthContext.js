// src/AuthContext.js
import React, { createContext, useState  , useEffect} from 'react';

// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    // Retrieve email from localStorage when the app initializes
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ email, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
