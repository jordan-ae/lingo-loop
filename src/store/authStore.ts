/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  navigate: (role: string) => void;
  login: (email: string, password: string, navigate: any) => Promise<boolean>;
  register: (email: string, password: string, firstName: string, lastName: string, role: string, navigate: any) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  token: localStorage.getItem('token') || null,

  initializeAuth: () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        set({ isAuthenticated: true, token });
      } catch (error) {
        console.error('Error initializing auth:', error);
        localStorage.removeItem('token');
        set({ isAuthenticated: false, token: null });
      }finally{
        set({isLoading: false})
      }
    }
  },

  navigate: (role) => {
    const { navigate } = require('react-router-dom');
    switch (role) {
      case 'admin':
        navigate('/admin-dashboard');
        break;
      case 'teacher':
        navigate('/teacher-dashboard');
        break;
      case 'student':
        navigate('/dashboard');
        break;
      default:
        navigate('/dashboard');
    }
  },

  login: async (email, password, navigate) => {
    set({ isLoading: true });
    
    try {
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        set({ 
          user: data.user, 
          isAuthenticated: true, 
          isLoading: false,
          token: data.token
        });
        switch (data.user.role.toLowerCase()) {
          case 'admin':
            navigate('/admin-dashboard');
            break;
          case 'tutor':
            navigate('/tutor-dashboard');
            break;
          case 'student':
            navigate('/dashboard');
            break;
          default:
            navigate('/dashboard');
        }
        
        return data;
      }
      
      set({ isLoading: false });
      return false;
    } catch (error) {
      set({ isLoading: false });
      return false;
    }
  },
  
  register: async (email, password, firstName, lastName, role, navigate) => {
    set({ isLoading: true });
    
    try {
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          password, 
          firstName, 
          lastName, 
          role,
          isActive: false
        }),
      });
      
      if (response.ok) {
        const res = await response.json();
        const user = res.user
        set({ user, isAuthenticated: true, isLoading: false, token: res.token });
        
        const userRole = res.user?.role || role;
        console.log('Navigating with role:', userRole, user);
        
        switch (userRole.toLowerCase()) {
          case 'admin':
            navigate('/admin-dashboard');
            break;
          case 'tutor':
            navigate('/tutor-application');
            break;
          case 'student':
            navigate('/dashboard');
            break;
          default:
            navigate('/tutors');
        }
        
        return true;
      }
      
      set({ isLoading: false });
      return false;
    } catch (error) {
      console.log(error)
      set({ isLoading: false });
      return false;
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, isAuthenticated: false, token: null });
  },
  
  forgotPassword: async (email) => {
    set({ isLoading: true });
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      set({ isLoading: false });
      return response.ok;
    } catch (error) {
      set({ isLoading: false });
      return false;
    }
  },
  
  resetPassword: async (token, newPassword) => {
    set({ isLoading: true });
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });
      
      set({ isLoading: false });
      return response.ok;
    } catch (error) {
      set({ isLoading: false });
      return false;
    }
  }
}));
