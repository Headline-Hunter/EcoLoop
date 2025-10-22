import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback((email, username, role = 'seller') => {
    const userData = {
      email,
      username,
      role,
      loggedIn: true,
      profileImage: role === 'buyer' ? '🛒' : '💼'
    };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    console.log('✅ User logged in:', userData);
  }, []);

  const signup = useCallback((email, username, company, role) => {
    const userData = {
      email,
      username,
      company,
      role,
      loggedIn: true,
      profileImage: role === 'buyer' ? '🛒' : '💼'
    };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    console.log('✅ User signed up:', userData);
  }, []);

  const logout = useCallback(() => {
    console.log('=== LOGOUT FUNCTION CALLED ===');
    console.log('localStorage before:', localStorage.getItem('user'));

    localStorage.removeItem('user');
    localStorage.removeItem('authToken');

    console.log('localStorage after removeItem:', localStorage.getItem('user'));
    console.log('Setting user to null...');

    setUser(null);

    console.log('=== LOGOUT COMPLETE ===');
  }, []);

  const value = {
    user,
    loading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}