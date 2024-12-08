import React, { createContext, useState, useContext, useEffect } from 'react';
import cookie from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      try {
        const token = cookie.get('token');
        if (token) {
          const decodedUser = jwtDecode(token);
          setUser({ ...decodedUser, jwt: token });
        } else {
          setUser(null);
        }
      } catch (e) {
        console.error('Error decoding token:', e);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = (token) => {
    cookie.set('token', token, { expires: 7 }); // Set cookie to expire in 7 days
    const decodedUser = jwtDecode(token);
    console.log('Decoded User:', decodedUser);
    setUser({ ...decodedUser, jwt: token });
  };

  const logout = () => {
    cookie.remove('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);