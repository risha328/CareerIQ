import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { loginApi, registerApi } from '../apis/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Optionally fetch user profile here
      setUser({ token }); // Simplified, you can decode token or fetch profile
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await loginApi(email, password);
      const { token, role, userId } = data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ token, role, userId });
      return { success: true, role };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const data = await registerApi(name, email, password, role);
      const { token, role: userRole, userId } = data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ token, role: userRole, userId });
      return { success: true, role: userRole };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
