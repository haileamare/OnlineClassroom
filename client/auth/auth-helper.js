import React, { createContext, useContext, useState } from 'react';
import { signout } from './api-auth';

const AuthContext = createContext();

const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  if (sessionStorage.getItem('jwt')) {
    return JSON.parse(sessionStorage.getItem('jwt'));
  } else {
    return false;
  }
};

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(isAuthenticated());

  const authenticate = (jwt, cb) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('jwt', JSON.stringify(jwt));
      setAuth(jwt);
    }
    cb();
  };

  const clearJWT = (cb) => {
    if (typeof window !== 'undefined') sessionStorage.removeItem('jwt');
    signout().then((data) => {
      document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      setAuth(false);
    });
    cb();
  };

  const updateUser = (data, cb) => {
    try {
      if (typeof window !== 'undefined') {
        const auth = JSON.parse(sessionStorage.getItem('jwt'));
        auth.user = data;
        authenticate(auth, cb);
      }
    } catch (err) {
      console.log('update User auth error', err);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, authenticate, clearJWT, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
